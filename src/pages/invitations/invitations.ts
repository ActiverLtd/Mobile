import { Component, OnInit } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { CreateActivityPage } from '../create-activity/create-activity';
import { Activity } from '../../app/interfaces/activity.interface';
import { ShowActivityPage } from '../show-activity/show-activity';
import { Invitation } from '../../app/interfaces/invitation.interface';
import { ToastService } from '../../app/services/toast.service';
import { BackendService } from '../../app/services/backend.service';

@Component({
  templateUrl: './invitations.html'
})
export class InvitationsPage implements OnInit {
  invitations: Observable<Invitation[]>;

  constructor(private popoverCtrl: PopoverController,
              private toastService: ToastService,
              private backendService: BackendService) {

  }

  ngOnInit() {
    this.invitations = this.backendService.getInvitations();
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
    this.backendService.rejectInvitation(invitation);
    this.toastService.show('TOAST_INVITATION_REJECTED');
  }

  accept(invitation: Invitation) {
    this.backendService.acceptInvitation(invitation);
    this.toastService.show('TOAST_INVITATION_ACCEPTED');
  }
}
