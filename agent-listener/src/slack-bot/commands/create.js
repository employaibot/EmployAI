// agent-listener/src/slack-bot/commands/create.js
import { buildCreateModal } from '../modal.js';

/**
 * Opens the Trello card creation modal in Slack.
 * @param {{ triggerId: string, board: object }} params
 */
export async function handleCreate({ triggerId, board }) {
  const modal = buildCreateModal(board);

  const res = await fetch('https://slack.com/api/views.open', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
    },
    body: JSON.stringify({ trigger_id: triggerId, view: modal }),
  });

  const data = await res.json();
  if (!data.ok) {
    console.error('[slack:create] views.open failed:', data.error);
    throw new Error(`views.open: ${data.error}`);
  }
}
