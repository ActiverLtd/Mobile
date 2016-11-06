import { ProfilePage } from '../profile/profile';
import { MyActivitiesPage } from '../activities/my-activities';
import { Component } from '@angular/core';

@Component({
  templateUrl: './main.html'
})
export class MainPage {
  myActivitiesPage = MyActivitiesPage;
  profilePage = ProfilePage;
}
