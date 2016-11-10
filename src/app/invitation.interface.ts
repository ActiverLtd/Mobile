import { Activity } from './activity.interface';
import { User } from './user.interface';

export interface Invitation {
  activity: Activity | string;
  user: User | string;
}
