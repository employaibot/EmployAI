// agent-listener/src/slack-bot/commands/move.js
import { moveCard } from '../trello/client.js';

/**
 * Handles "move [card-id] to [list-name]"
 * @param {{ text: string, board: object }} params
 * @returns {Promise<{ text: string }>}
 */
export async function handleMove({ text, board }) {
  const match = text.match(/^move\s+(\S+)\s+to\s+(.+)$/i);
  if (!match) {
    return { text: 'Usage: `/trello move [card-id] to [list-name]`' };
  }

  const [, cardId, rawListName] = match;
  const listName = rawListName.trim();
  const list = board.lists.find(l => l.name.toLowerCase() === listName.toLowerCase());
  if (!list) {
    const available = board.lists.map(l => l.name).join(', ');
    return { text: `List not found. Available: ${available}` };
  }

  try {
    const card = await moveCard(cardId, list.id);
    return { text: `Moved *${card.name}* to *${list.name}*.` };
  } catch (err) {
    console.error('[slack:move] Trello error:', err.message);
    return { text: `Failed to move card: ${err.message}` };
  }
}
