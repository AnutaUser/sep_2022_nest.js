import { IPet } from './pet.interface';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  age?: number;
  city?: string;
  avatar?: string;
  status?: boolean;
  pets?: IPet[];
}
