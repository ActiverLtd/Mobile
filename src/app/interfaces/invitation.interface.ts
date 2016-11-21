import { User } from './user.interface';
import { Activity } from './activity.interface';

export interface Invitation {
  activity_uid: string;
  activity?: Activity;
  user_uid: string;
  user?: User;
}
