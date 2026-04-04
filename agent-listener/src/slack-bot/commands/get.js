// agent-listener/src/slack-bot/commands/get.js
import { getCard } from '../trello/client.js';

/**
 * Handles "get [card-id]"
 * @param {{ text: string, board: object }} params
 * @returns {Promise<{ text: string }>}
 */
export async function handleGet({ text, board }) {
  const match = text.match(/^get\s+(\S+)$/i);
  if (!match) {
    return { text: 'Usage: `/trello get [card-id]`' };
  }

  const [, cardId] = match;
  try {
    const card = await getCard(cardId);
    const list = board.lists.find(l => l.id === card.idList);
    const listName = list?.name ?? card.idList;
    const due = card.due ? new Date(card.due).toDateString() : 'None';
    const assignees =
      Array.isArray(card.members) && card.members.length > 0
        ? card.members.map(m => m.fullName || m.username).join(', ')
        : 'None';

    return {
      text: `*${card.name}*\nList: ${listName}\nDue: ${due}\nAssignees: ${assignees}`,
    };
  } catch (err) {
    console.error('[slack:get] Trello error:', err.message);
    return { text: `Failed to get card: ${err.message}` };
  }
}
