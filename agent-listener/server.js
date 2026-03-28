import express from 'express';
import { spawn, spawnSync } from 'child_process';
import crypto from 'crypto';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');

const app = express();
app.use(express.json());

const PORT = 3001;
const AGENT_SECRET = process.env.AGENT_SECRET;

app.post('/run-agent', (req, res) => {
  const incomingSecret = req.headers['x-agent-secret'];

  if (!AGENT_SECRET || incomingSecret !== AGENT_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { taskId, branchSlug, description, acceptanceCriteria } = req.body;

  if (!taskId || !branchSlug || !description || !Array.isArray(acceptanceCriteria)) {
    return res.status(400).json({ error: 'Missing required fields: taskId, branchSlug, description, acceptanceCriteria' });
  }

  const prompt = `You are operating as the Code Agent for the EmployAI project.

Your rules and coding standards are defined in the file .claude/agents/code-agent.md in the project root. Read that file first and follow every rule in it.

Your task is:
Task ID: ${taskId}
Description: ${description}
Acceptance criteria:
${acceptanceCriteria.map((c) => `- ${c}`).join('\n')}

Your branch name must be: feature/${branchSlug}

Follow all rules in .claude/agents/code-agent.md. Open a draft PR.`;

  try {
    const child = spawn('claude', ['-p', '-', '--dangerously-skip-permissions', '--verbose'], {
      cwd: PROJECT_ROOT,
      shell: true,
      stdio: ['pipe', 'pipe', 'pipe'],
      windowsHide: true,
      env: {
        ...process.env,
        PATH: process.env.PATH
      }
    });

    child.stdin.write(prompt);
    child.stdin.end();

    child.stdout.on('data', (data) => {
      const lines = data.toString().split('\n').filter(line => line.trim());
      lines.forEach(line => {
        process.stdout.write(`\r\x1b[K`);
        console.log(`  \x1b[36m[claude]\x1b[0m ${line}`);
      });
    });

    child.stderr.on('data', (data) => {
      const lines = data.toString().split('\n').filter(line => line.trim());
      lines.forEach(line => {
        process.stdout.write(`\r\x1b[K`);
        console.log(`  \x1b[33m[claude:warn]\x1b[0m ${line}`);
      });
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`[agent-listener] Task ${taskId} — claude finished successfully.`);
      } else {
        console.error(`[agent-listener] Task ${taskId} — claude exited with code ${code}`);
      }
    });

    console.log(`[agent-listener] Task ${taskId} — spawned claude process.`);
    return res.status(200).json({ status: 'spawned', taskId });
  } catch (err) {
    console.error(`[agent-listener] Task ${taskId} — failed to spawn claude:`, err.message);
    return res.status(500).json({ error: 'Failed to spawn agent' });
  }
});

let BACKLOG_LIST_ID = null;
try {
  const listsRes = await fetch(
    `https://api.trello.com/1/boards/${process.env.TRELLO_BOARD_ID}/lists?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
  );
  if (!listsRes.ok) throw new Error(`Failed to fetch Trello lists: ${listsRes.status}`);
  const lists = await listsRes.json();
  const backlogList = lists.find((l) => l.name === 'Backlog');
  if (!backlogList) throw new Error('Backlog list not found on Trello board');
  BACKLOG_LIST_ID = backlogList.id;
} catch (err) {
  console.error(`[agent-listener] Trello startup error: ${err.message}`);
}

if (BACKLOG_LIST_ID && process.env.SLACK_SIGNING_SECRET && process.env.SLACK_ALLOWED_USERS) {
  console.log(`[agent-listener] Slack listening for /create.`);
} else {
  console.warn(`[agent-listener] Slack-Trello not ready — check Trello credentials and Slack env vars.`);
}

function verifySlackSignature(req, res, next) {
  const signingSecret = process.env.SLACK_SIGNING_SECRET;
  const timestamp = req.headers['x-slack-request-timestamp'];
  const signature = req.headers['x-slack-signature'];

  if (!signingSecret || !timestamp || !signature) {
    return res.status(400).send();
  }

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp, 10)) > 300) {
    return res.status(400).send();
  }

  const basestring = `v0:${timestamp}:${req.body.toString()}`;
  const computed = `v0=${crypto.createHmac('sha256', signingSecret).update(basestring).digest('hex')}`;

  const sigBuffer = Buffer.from(signature, 'utf8');
  const computedBuffer = Buffer.from(computed, 'utf8');
  if (sigBuffer.length !== computedBuffer.length || !crypto.timingSafeEqual(sigBuffer, computedBuffer)) {
    return res.status(400).send();
  }

  next();
}

app.post(
  '/slack/commands',
  express.raw({ type: 'application/x-www-form-urlencoded' }),
  verifySlackSignature,
  async (req, res) => {
    const params = new URLSearchParams(req.body.toString());
    const slackBody = Object.fromEntries(params.entries());

    const allowedUsers = (process.env.SLACK_ALLOWED_USERS || '').split(',').map((u) => u.trim()).filter(Boolean);
    if (!allowedUsers.includes(slackBody.user_id)) {
      return res.status(200).json({ text: 'Not authorized.' });
    }

    const command = slackBody.command;
    const rawText = (slackBody.text || '').trim();

    if (command !== '/create' || !rawText) {
      return res.status(200).json({ text: 'Usage: /create <task title>' });
    }

    let cardName = rawText;
    let cardDesc = '';

    try {
      const prompt = `Convert this casual task description into a structured ticket. Return only a JSON object with fields: title (string), description (string). No markdown, no backticks, no explanation. Task: ${rawText}`;
      const result = spawnSync('claude', ['-p', '-'], {
        input: prompt,
        encoding: 'utf8',
        timeout: 2500,
        shell: true
      });
      if (result.error) {
        console.error(`[slack] Claude spawn error: ${result.error.message}`);
      } else if (result.status === 0 && result.stdout) {
        const parsed = JSON.parse(result.stdout.trim());
        if (parsed.title) cardName = parsed.title;
        if (parsed.description) cardDesc = parsed.description;
      }
    } catch {
      // fall through to raw text
    }

    if (!BACKLOG_LIST_ID) {
      return res.status(200).json({ text: 'Failed to create card.' });
    }

    const trelloUrl = new URL('https://api.trello.com/1/cards');
    trelloUrl.searchParams.set('key', process.env.TRELLO_KEY || '');
    trelloUrl.searchParams.set('token', process.env.TRELLO_TOKEN || '');
    trelloUrl.searchParams.set('idList', BACKLOG_LIST_ID);
    trelloUrl.searchParams.set('name', cardName);
    if (cardDesc) trelloUrl.searchParams.set('desc', cardDesc);

    try {
      const trelloRes = await fetch(trelloUrl.toString(), { method: 'POST' });
      if (!trelloRes.ok) {
        console.error(`[slack] Trello card creation failed: ${trelloRes.status}`);
        return res.status(200).json({ text: 'Failed to create card.' });
      }
      const text = cardDesc ? `Created card: ${cardName}\n${cardDesc}` : `Created card: ${cardName}`;
      return res.status(200).json({ text });
    } catch (err) {
      console.error('[slack] Trello card creation error:', err.message);
      return res.status(200).json({ text: 'Failed to create card.' });
    }
  }
);

app.listen(PORT, () => {
  console.log(`[agent-listener] Listening on port ${PORT}`);
});
