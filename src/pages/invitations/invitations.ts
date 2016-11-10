import { Component, OnInit } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { CreateActivityPage } from '../create-activity/create-activity';
import { UserService } from '../../app/user.service';
import { Activity } from '../../app/activity.interface';
import { ShowActivityPage } from '../show-activity/show-activity';

@Component({
  templateUrl: './invitations.html'
})
export class InvitationsPage implements OnInit {
  invitations: any[] = [];
  constructor(private popoverCtrl: PopoverController, private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getInvitations().subscribe(invitations => this.invitations = invitations);
  }

  showCreateActivity($event) {
    let popover = this.popoverCtrl.create(CreateActivityPage, {}, {cssClass: 'large-popover'});
    popover.present({
      ev: $event
    });
  }

  openActivity(activity: Activity) {
    let popover = this.popoverCtrl.create(ShowActivityPage, {activityId: activity.$key}, {cssClass: 'show-activity-popover'});
    popover.present();
  }

  reject() {

  }

  accept() {

  }
}
