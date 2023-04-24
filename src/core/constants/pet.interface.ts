import { IUser } from './user.interface';

export interface IPet {
  id: string;
  name: string;
  type: string;
  image: string;
  logo: string;
  status: boolean;
  owner: IUser;
  ownerId: string;
}
