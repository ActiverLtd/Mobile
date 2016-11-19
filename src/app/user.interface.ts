import { Invitation } from './invitation.interface';
import { Activity } from './activity.interface';
export interface User {
  $key?: string;
  uid: string;
  name: string;
  image: string;
  ratings: {[sport: string]: number;};
  invitation_list: string[];
  invitations?: Invitation[];
  activity_list: string[];
  activities: Activity[];
}
