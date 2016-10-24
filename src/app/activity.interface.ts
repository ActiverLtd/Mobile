export interface Activity {
  id?: string;
  sport: string;
  location: any;
  timestamp: number;
  organizer: string;
  participants: string[];
  participants_max: number;
}
