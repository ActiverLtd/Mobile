export interface User {
  uid: string;
  name: string;
  ratings: {activity_id: number; level: number;}[];
  invitations: any[];
}
