// agent-listener/src/slack-bot/index.js
import { Router } from 'express';
import express from 'express';
import { verifySlackSignature } from './verify.js';
import { routeCommand } from './router.js';
import { createCard } from './trello/client.js';

const rawBody = express.raw({ type: '*/*' });

/**
 * Returns an Express Router mounted at /slack.
 * @param {{ lists: Array, members: Array }} board
 */
export function createSlackRouter(board) {
  const router = Router();
  const allowedUsers = (process.env.SLACK_ALLOWED_USERS || '')
    .split(',')
    .map(u => u.trim())
    .filter(Boolean);

  // ── POST /slack/commands ─────────────────────────────────────────
  router.post('/commands', rawBody, verifySlackSignature, async (req, res) => {
    const params = new URLSearchParams(req.body.toString());
    const body = Object.fromEntries(params.entries());

    if (allowedUsers.length > 0 && !allowedUsers.includes(body.user_id)) {
      return res.status(200).json({ text: 'Not authorized.' });
    }

    try {
      await routeCommand({
        command: body.command,
        text: body.text || '',
        triggerId: body.trigger_id,
        userId: body.user_id,
        board,
        res,
      });
    } catch (err) {
      console.error('[slack:commands] unhandled error:', err.message);
      if (!res.headersSent) {
        res.status(200).json({ text: 'An unexpected error occurred.' });
      }
    }
  });

  // ── POST /slack/interactions ─────────────────────────────────────
  router.post('/interactions', rawBody, verifySlackSignature, async (req, res) => {
    const params = new URLSearchParams(req.body.toString());
    let payload;
    try {
      payload = JSON.parse(params.get('payload') || '{}');
    } catch {
      return res.status(400).send();
    }

    if (
      payload.type !== 'view_submission' ||
      payload.view?.callback_id !== 'trello_create_card'
    ) {
      return res.status(200).send('');
    }

    // Return 200 immediately before any async work
    res.status(200).send('');

    const userId = payload.user?.id;
    const values = payload.view?.state?.values ?? {};

    const title = values.title_block?.title_input?.value;
    const description = values.description_block?.description_input?.value || '';
    const listId = values.list_block?.list_select?.selected_option?.value;
    const dueDate = values.due_date_block?.due_date_picker?.selected_date ?? null;
    const memberId = values.assign_block?.assign_select?.selected_option?.value ?? null;

    try {
      const card = await createCard({ idList: listId, name: title, desc: description, due: dueDate, idMembers: memberId });
      await postToUser(userId, `Card created: *${card.name}* — <${card.url}|View on Trello>`);
    } catch (err) {
      console.error('[slack:interactions] createCard failed:', err.message);
      await postToUser(userId, `Failed to create card: ${err.message}`);
    }
  });

  return router;
}

async function postToUser(userId, text) {
  try {
    const res = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      },
      body: JSON.stringify({ channel: userId, text }),
    });
    const data = await res.json();
    if (!data.ok) console.error('[slack] chat.postMessage failed:', data.error);
  } catch (err) {
    console.error('[slack] chat.postMessage error:', err.message);
  }
}
