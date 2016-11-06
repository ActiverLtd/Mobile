export interface Activity {
  $key?: string;
  sport: string;
  location: any;
  timestamp: number;
  organizer: string | any;
  participants: any;
  participants_max: number;
  shape: string;
  additional_info?: string;
  comments?: string | any[];
}
