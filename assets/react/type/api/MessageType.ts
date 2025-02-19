export type MessageType = {
  conversationId: number;
  content: string;
  messageId: number;
  username: string;
  userId: number;
};

export type MessagesListType = MessageType[];