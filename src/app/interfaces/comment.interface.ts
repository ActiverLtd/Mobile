import { User } from './user.interface';

export interface Comment {
  user_uid: string;
  user?: User;
  text: string;
}
