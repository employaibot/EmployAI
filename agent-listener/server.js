import express from 'express';
import { spawn, spawnSync } from 'child_process';
import crypto from 'crypto';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { resolveBoard } from './src/slack-bot/trello/lists.js';
import { createSlackRouter } from './src/slack-bot/index.js';

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

// Resolve Trello board at startup; mount Slack bot if successful
try {
  const board = await resolveBoard();
  console.log(`[agent-listener] Trello board resolved: ${board.lists.length} lists, ${board.members.length} members.`);
  app.use('/slack', createSlackRouter(board));
  console.log('[agent-listener] Slack bot mounted at /slack.');
} catch (err) {
  console.error(`[agent-listener] Trello startup error — Slack bot disabled: ${err.message}`);
  console.warn('[agent-listener] Check TRELLO_API_KEY, TRELLO_TOKEN, TRELLO_BOARD_ID in .env');
}

app.listen(PORT, () => {
  console.log(`[agent-listener] Listening on port ${PORT}`);
});
