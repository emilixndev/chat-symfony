import { apiRequest } from '../AxiosService';
import { MessagesListType } from '../../type/api/MessageType';

export const fetchMessages = async (conversationId: number): Promise<MessagesListType> => {
  return await apiRequest<MessagesListType>(`/messages/${conversationId}`, 'GET');
};

export const postNewMessage = async (
  selectedChat: number,
  newMessage: string,
  userId: number
): Promise<MessagesListType> => {
  return await apiRequest<MessagesListType>(
    `/messages/${selectedChat}/send?message=${newMessage}&userId=${userId}`,
    'POST'
  );
};
