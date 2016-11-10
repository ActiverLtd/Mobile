import { ProfilePage } from '../profile/profile';
import { MyActivitiesPage } from '../activities/my-activities';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../app/user.service';

@Component({
  templateUrl: './main.html'
})
export class MainPage implements OnInit {
  myActivitiesPage = MyActivitiesPage;
  profilePage = ProfilePage;
  invitationCount = 0;

  constructor(public userService: UserService) {

  }

  ngOnInit() {
    this.userService.getInvitations().subscribe(invitations => this.invitationCount = invitations.length);
  }
}
