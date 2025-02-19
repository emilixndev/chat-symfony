import { apiRequest } from '../AxiosService';
import { UserType } from '../../type/api/UserType';

export const fetchUsers = async (userId: number): Promise<UserType> => {
  return await apiRequest<UserType>(`/user/${userId}`, 'GET');
};
