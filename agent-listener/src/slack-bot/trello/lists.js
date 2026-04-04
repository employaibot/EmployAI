// agent-listener/src/slack-bot/trello/lists.js
export async function resolveBoard() {
  const key = process.env.TRELLO_API_KEY;
  const token = process.env.TRELLO_TOKEN;
  const boardId = process.env.TRELLO_BOARD_ID;

  if (!key || !token || !boardId) {
    throw new Error('TRELLO_API_KEY, TRELLO_TOKEN, and TRELLO_BOARD_ID must be set');
  }

  const base = `https://api.trello.com/1/boards/${boardId}`;
  const [listsRes, membersRes] = await Promise.all([
    fetch(`${base}/lists?key=${key}&token=${token}`),
    fetch(`${base}/members?key=${key}&token=${token}`),
  ]);

  if (!listsRes.ok) throw new Error(`Trello lists fetch failed: ${listsRes.status}`);
  if (!membersRes.ok) throw new Error(`Trello members fetch failed: ${membersRes.status}`);

  const [lists, members] = await Promise.all([listsRes.json(), membersRes.json()]);

  return {
    lists: lists.map(l => ({ id: l.id, name: l.name })),
    members: members.map(m => ({ id: m.id, username: m.username, fullName: m.fullName })),
  };
}
