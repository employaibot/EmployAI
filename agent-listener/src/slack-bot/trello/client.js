// agent-listener/src/slack-bot/trello/client.js
const BASE = 'https://api.trello.com/1';

if (!process.env.TRELLO_API_KEY || !process.env.TRELLO_TOKEN) {
  throw new Error('[trello/client] TRELLO_API_KEY and TRELLO_TOKEN must be set in environment');
}

function trelloFetch(path, { method = 'GET', body, headers = {} } = {}) {
  const sep = path.includes('?') ? '&' : '?';
  const url = `${BASE}${path}${sep}key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`;
  return fetch(url, { method, body, headers });
}

export async function createCard({ idList, name, desc, due, idMembers }) {
  const payload = { idList, name };
  if (desc) payload.desc = desc;
  if (due) payload.due = due;
  if (idMembers) payload.idMembers = Array.isArray(idMembers) ? idMembers : [idMembers];

  const res = await trelloFetch('/cards', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => String(res.status));
    throw new Error(`Trello createCard failed: ${res.status} — ${text}`);
  }
  return res.json();
}

export async function moveCard(cardId, listId) {
  const res = await trelloFetch(`/cards/${cardId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idList: listId }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => String(res.status));
    throw new Error(`Trello moveCard failed: ${res.status} — ${text}`);
  }
  return res.json();
}

export async function getCard(cardId) {
  const res = await trelloFetch(
    `/cards/${cardId}?members=true&member_fields=fullName,username`
  );
  if (!res.ok) {
    const text = await res.text().catch(() => String(res.status));
    throw new Error(`Trello getCard failed: ${res.status} — ${text}`);
  }
  return res.json();
}

export async function assignMember(cardId, memberId) {
  const res = await trelloFetch(`/cards/${cardId}/idMembers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value: memberId }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => String(res.status));
    throw new Error(`Trello assignMember failed: ${res.status} — ${text}`);
  }
  return res.json();
}
