import { MessageType } from './MessageType';

type ConversationType = {
  conversationId: number;
  content: string;
  createdAd: [];
  username: string;
};


export type ConversationListType = ConversationType[];