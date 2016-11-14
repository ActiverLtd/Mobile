import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { User } from './user.interface';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable()
export class UserService {
  private user$: Observable<User>;

  constructor(private af: AngularFire, private firebaseService: FirebaseService) {
    this.user$ = this.af.auth.switchMap(
      (auth: FirebaseAuthState) => {
        if (!auth) {
          return Observable.of({});
        }
        return this.af.database.object(`/users/${auth.auth.uid}`);
      }
    );
  }

  getUser() {
    return this.user$;
  }

  getInvitations() {
    return this.user$.switchMap(user => {
      if (!user.invitations) {
        user.invitations = [];
      }
      const arr = Object.keys(user.invitations).map(id => this.af.database.object(`/invitations/${id}`).switchMap(invitation => {
        return Observable.zip(this.af.database.object(`/activities/${invitation.activity}`), this.af.database.object(`/users/${invitation.user}`)).map(
          ([activity, user]) => {
            invitation.activity = activity;
            invitation.user = user;
            6
            this.firebaseService.fetchUsersToArray(activity, 'participants');
            return invitation;
          }
        )
      }));
      return Observable.zip(...arr);
    });
  }

  getMyActivities() {
    return this.user$.switchMap(user => {
      if (!user.activities) {
        user.activities = [];
      }
      return Observable.zip(
        ...Object.keys(user.activities).map(id => this.af.database.object(`/activities/${id}`).switchMap(activity => {
            return this.af.database.object(`/users/${activity.organizer}`).map(user => {
              activity.organizer = user;
              this.firebaseService.fetchUsersToArray(activity, 'participants');
              return activity;
            })
          })
        ));
    });
  }
}
