// agent-listener/src/slack-bot/commands/assign.js
import { assignMember } from '../trello/client.js';

/**
 * Handles "assign [card-id] to [@username]"
 * @param {{ text: string, board: object }} params
 * @returns {Promise<{ text: string }>}
 */
export async function handleAssign({ text, board }) {
  const match = text.match(/^assign\s+(\S+)\s+to\s+(@?\S+)$/i);
  if (!match) {
    return { text: 'Usage: `/trello assign [card-id] to [@username]`' };
  }

  const [, cardId, rawUser] = match;
  const username = rawUser.replace(/^@/, '').toLowerCase();
  const member = board.members.find(m => m.username.toLowerCase() === username);
  if (!member) {
    const available = board.members.map(m => `@${m.username}`).join(', ');
    return { text: `Member not found. Board members: ${available}` };
  }

  try {
    await assignMember(cardId, member.id);
    return { text: `Assigned @${member.username} to card.` };
  } catch (err) {
    console.error('[slack:assign] Trello error:', err.message);
    return { text: `Failed to assign member: ${err.message}` };
  }
}
