import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';


@Component({
  templateUrl: './profile.html'
})
export class ProfilePage {
  constructor(public af: AngularFire) {}

  logout() {
    this.af.auth.logout();
  }
}
