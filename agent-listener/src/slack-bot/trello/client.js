// agent-listener/src/slack-bot/trello/client.js
const BASE = 'https://api.trello.com/1';

function trelloFetch(path, { method = 'GET', body, headers = {} } = {}) {
  const url = new URL(`${BASE}${path}`);
  url.searchParams.set('key', process.env.TRELLO_API_KEY);
  url.searchParams.set('token', process.env.TRELLO_TOKEN);
  return fetch(url.toString(), { method, body, headers });
}

export async function createCard({ idList, name, desc, due, idMembers }) {
  const payload = { idList, name };
  if (desc) payload.desc = desc;
  if (due) payload.due = due;
  if (idMembers) payload.idMembers = [idMembers];

  const res = await trelloFetch('/cards', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Trello createCard failed: ${res.status}`);
  return res.json();
}

export async function moveCard(cardId, listId) {
  const res = await trelloFetch(`/cards/${cardId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idList: listId }),
  });
  if (!res.ok) throw new Error(`Trello moveCard failed: ${res.status}`);
  return res.json();
}

export async function getCard(cardId) {
  const res = await trelloFetch(
    `/cards/${cardId}?members=true&member_fields=fullName,username`
  );
  if (!res.ok) throw new Error(`Trello getCard failed: ${res.status}`);
  return res.json();
}

export async function assignMember(cardId, memberId) {
  const res = await trelloFetch(`/cards/${cardId}/idMembers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value: memberId }),
  });
  if (!res.ok) throw new Error(`Trello assignMember failed: ${res.status}`);
  return res.json();
}
