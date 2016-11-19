import { User } from './user.interface';
import { Comment } from './comment.interface';

export interface Activity {
  $key?: string;
  sport: string;
  location: any;
  timestamp: number;
  organizer_uid: string;
  organizer?: User;
  participant_list: string[];
  participants?: User[];
  participants_max: number;
  shape: string;
  additional_info?: string;
  comments: Comment[];
}
