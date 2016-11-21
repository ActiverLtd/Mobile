import { Invitation } from './invitation.interface';
import { Activity } from './activity.interface';
import { Rating } from './rating.interface';

export interface User {
  $key?: string;
  uid: string;
  name: string;
  bio: string;
  image: string;
  ratings: Rating;
  invitation_list: string[];
  invitations?: Invitation[];
  activity_list: string[];
  activities: Activity[];
}
