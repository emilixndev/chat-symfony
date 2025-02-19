import { apiRequest } from '../AxiosService';
import { ConversationListType } from '../../type/api/ConversationType';

export const fetchConversation = async (userId: number): Promise<ConversationListType> => {
  return await apiRequest<ConversationListType>(`/messages/conversation/${userId}`, 'GET');
};
