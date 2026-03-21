import express from 'express';
import { exec } from 'child_process';
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

  const prompt = `Read and follow all rules in .claude/agents/code-agent.md before doing anything else.

Task ID: ${taskId}
Description: ${description}
Acceptance criteria:
${acceptanceCriteria.map((c) => `- ${c}`).join('\n')}

Follow all git rules in code-agent.md: create a feature branch, commit your changes, and open a draft PR.`;

  // Escape prompt for single-quoted shell argument
  const escapedPrompt = prompt.replace(/'/g, `'\\''`);
  const command = `claude '${escapedPrompt}'`;

  try {
    exec(command, { cwd: PROJECT_ROOT }, (error) => {
      if (error) {
        console.error(`[agent-listener] Task ${taskId} — claude exited with error:`, error.message);
      } else {
        console.log(`[agent-listener] Task ${taskId} — claude finished successfully.`);
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
