import { NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { MyActivitiesPage } from '../activities/my-activities';
import { Component } from '@angular/core';

@Component({
  templateUrl: './main.html'
})
export class MainPage {
  constructor(private nav: NavController) {
  }

  openActivities() {
    this.nav.push(MyActivitiesPage);
  }

  openProfile() {
    this.nav.push(ProfilePage);
  }
}
