export interface Activity {
  id?: string;
  sport: string;
  location: any;
  timestamp: number;
  organizer: string | any;
  participants: string[];
  participants_max: number;
  shape: string;
  additional_info?: string;
}
