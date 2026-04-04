// agent-listener/src/slack-bot/router.js
import { handleCreate } from './commands/create.js';
import { handleMove } from './commands/move.js';
import { handleGet } from './commands/get.js';
import { handleAssign } from './commands/assign.js';

const USAGE = [
  '`/trello create` — open card creation modal',
  '`/trello move [card-id] to [list-name]` — move a card between lists',
  '`/trello get [card-id]` — show card details',
  '`/trello assign [card-id] to [@username]` — assign a board member',
].join('\n');

/**
 * Routes a /trello slash command to the correct handler.
 * For 'create': responds 200 immediately and opens the modal asynchronously.
 * For all others: awaits the handler and responds with the result.
 *
 * @param {{ command: string, text: string, triggerId: string, userId: string, board: object, res: import('express').Response }} params
 */
export async function routeCommand({ command, text, triggerId, userId, board, res }) {
  if (command !== '/trello') {
    return res.status(200).json({ text: 'Unknown command.' });
  }

  const subcommand = (text || '').trim();
  const sub = subcommand.toLowerCase();

  if (sub === 'create') {
    // Return 200 immediately — modal opens asynchronously
    res.status(200).send('');
    handleCreate({ triggerId, board }).catch(err =>
      console.error('[slack:router] create modal error:', err.message)
    );
    return;
  }

  if (sub.startsWith('move ')) {
    const result = await handleMove({ text: subcommand, board });
    return res.status(200).json({ response_type: 'in_channel', ...result });
  }

  if (sub.startsWith('get ')) {
    const result = await handleGet({ text: subcommand, board });
    return res.status(200).json({ response_type: 'ephemeral', ...result });
  }

  if (sub.startsWith('assign ')) {
    const result = await handleAssign({ text: subcommand, board });
    return res.status(200).json({ response_type: 'in_channel', ...result });
  }

  return res.status(200).json({ text: USAGE });
}
