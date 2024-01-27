import { IOccupation } from ".";

export interface IUserData {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  phone?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  occupation?: IOccupation;
}

export interface IUserTable {
  isLoading?: boolean;
  data?: IUserData[];
}

export interface IAuthUser {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  isActive?: boolean;
  occupation?: IOccupation;
}
