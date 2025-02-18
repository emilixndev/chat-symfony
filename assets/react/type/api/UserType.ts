import { apiRequest } from '../../services/axios';

export interface UserType {
  id: number;
  username: string;
  password: string;
}

export const fetchUsers = async (userId: number): Promise<UserType> => {
  return await apiRequest<UserType>(`/user/${userId}`, 'GET');
};
