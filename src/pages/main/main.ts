import { ProfilePage } from '../profile/profile';
import { MyActivitiesPage } from '../my-activities/my-activities';
import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../app/backend.service';

@Component({
  templateUrl: './main.html'
})
export class MainPage implements OnInit {
  myActivitiesPage = MyActivitiesPage;
  profilePage = ProfilePage;
  invitationCount = 0;

  constructor(public backendService: BackendService) {

  }

  ngOnInit() {
    this.backendService.getInvitations().subscribe(invitations => this.invitationCount = invitations.length);
  }
}
