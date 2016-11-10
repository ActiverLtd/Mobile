import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { User } from './user.interface';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  private user$: Observable<User>;

  constructor(private af: AngularFire) {
    this.user$ = this.af.auth.switchMap(
      (auth: FirebaseAuthState) => this.af.database.object(`/users/${auth.auth.uid}`)
    );
  }

  getUser() {
    return this.user$;
  }

  getInvitations() {
    return this.user$.switchMap(user => {
      const arr = Object.keys(user.invitations).map(id => this.af.database.object(`/invitations/${id}`).switchMap(invitation => {
        return Observable.zip(this.af.database.object(`/activities/${invitation.activity}`), this.af.database.object(`/users/${invitation.user}`)).map(
          ([activity, user]) => {
            invitation.activity = activity;
            invitation.user = user;
            return invitation;
          }
        )
      }));
      return Observable.zip(...arr);
    })
  }
}
