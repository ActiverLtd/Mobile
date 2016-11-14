export interface User {
  uid: string;
  name: string;
  image: string;
  ratings: {activity_id: number; level: number;}[];
  invitations: any[];
  activities: any[];
}
