import express from 'express';
import { spawn } from 'child_process';
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

  const { taskId, description, acceptanceCriteria } = req.body;

  if (!taskId || !description || !Array.isArray(acceptanceCriteria)) {
    return res.status(400).json({ error: 'Missing required fields: taskId, description, acceptanceCriteria' });
  }

  const prompt = `You are operating as the Code Agent for the EmployAI project.

Your rules and coding standards are defined in the file .claude/agents/code-agent.md in the project root. Read that file first and follow every rule in it.

Your task is:
Task ID: ${taskId}
Description: ${description}
Acceptance criteria:
${acceptanceCriteria.map((c) => `- ${c}`).join('\n')}

Steps to complete:
1. Read .claude/agents/code-agent.md
2. Create a new branch following the naming convention in that file
3. Implement the task following all coding standards
4. Run lint, type-check, and build before committing
5. Commit using Conventional Commits format
6. Open a draft PR with description of what changed and why`;

  try {
    const child = spawn('claude', ['-p', '-', '--dangerously-skip-permissions'], {
      cwd: PROJECT_ROOT,
      shell: true,
      stdio: ['pipe', 'pipe', 'pipe'],
      windowsHide: true
    });

    child.stdin.write(prompt);
    child.stdin.end();

    child.stdout.on('data', (data) => {
      console.log(`[agent-listener] Task ${taskId} output:`, data.toString());
    });

    child.stderr.on('data', (data) => {
      console.error(`[agent-listener] Task ${taskId} error:`, data.toString());
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

app.listen(PORT, () => {
  console.log(`[agent-listener] Listening on port ${PORT}`);
});
