import { Component, OnInit } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { CreateActivityPage } from '../create-activity/create-activity';
import { UserService } from '../../app/user.service';
import { Activity } from '../../app/activity.interface';
import { ShowActivityPage } from '../show-activity/show-activity';
import { AngularFire } from 'angularfire2';
import { Invitation } from '../../app/invitation.interface';
import { ToastService } from '../../app/toast.service';

@Component({
  templateUrl: './invitations.html'
})
export class InvitationsPage implements OnInit {
  invitations: any[] = [];

  constructor(private popoverCtrl: PopoverController,
              private af: AngularFire,
              private toastService: ToastService,
              private userService: UserService) {

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

  reject(invitation: Invitation) {
    this.userService.getUser().first().subscribe(user => {
      this.af.database.object(`/activities/${invitation.activity.$key}/participants/${user.uid}`).set(false);
      this.removeInvitation(invitation).then(() => {
        this.toastService.show('TOAST_INVITATION_ACCEPTED');
      });
    });

    this.toastService.show('TOAST_INVITATION_ACCEPTED');
  }

  accept(invitation: Invitation) {
    this.userService.getUser().first().subscribe(user => {
      this.af.database.object(`/activities/${invitation.activity.$key}/participants/${user.uid}`).set(true);
      this.af.database.list(`/users/${invitation.user.$key}/activities`).push(invitation.activity);
      this.removeInvitation(invitation).then(() => {
        this.toastService.show('TOAST_INVITATION_REJECTED');
      });
    });
  }

  private removeInvitation(invitation) {
    return this.af.database.object(`/invitations/${invitation.$key}`).remove();
  }
}