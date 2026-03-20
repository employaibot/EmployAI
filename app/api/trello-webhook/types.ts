export interface TrelloMember {
  id: string;
  fullName: string;
  username: string;
}

export interface TrelloList {
  id: string;
  name: string;
}

export interface TrelloCard {
  id: string;
  name: string;
  desc: string;
  idList: string;
  idBoard: string;
  url: string;
}

export interface TrelloBoard {
  id: string;
  name: string;
  shortLink: string;
}

export interface TrelloActionData {
  card?: TrelloCard;
  list?: TrelloList;
  listAfter?: TrelloList;
  listBefore?: TrelloList;
  board?: TrelloBoard;
}

export interface TrelloAction {
  id: string;
  type: string;
  date: string;
  memberCreator: TrelloMember;
  data: TrelloActionData;
}

export interface TrelloWebhookPayload {
  action: TrelloAction;
  model: TrelloBoard;
}
