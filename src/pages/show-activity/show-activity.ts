import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Activity } from '../../app/activity.interface';
import { ToastService } from '../../app/toast.service';
import { BackendService } from '../../app/backend.service';
import { User } from '../../app/user.interface';

@Component({
  templateUrl: './show-activity.html'
})
export class ShowActivityPage implements OnInit {
  activity: Activity;
  uid: string;

  constructor(private params: NavParams,
              private viewController: ViewController,
              private toastService: ToastService,
              private backendService: BackendService) {
  }

  ngOnInit() {
    this.backendService.getActivity(this.params.get('activityId')).subscribe(activity => {
      this.activity = activity;
    });
    this.backendService.lastUid().subscribe(uid => {
      this.uid = uid;
    })
  }

  participantsByLevel(level: number = undefined) {
    return this.participants.filter(participant => {
      if ((!participant.ratings || !participant.ratings[this.activity.sport])) {
        return !level;
      }
      return participant.ratings[this.activity.sport] === level;
    }).length;
  }

  get participants(): User[] {
    if (!(this.activity.participants instanceof Array)) {
      return [this.activity.organizer];
    }
    return this.activity.participants.concat(this.activity.organizer);
  }

  close() {
    this.viewController.dismiss();
  }

  join() {
    this.backendService.joinActivity(this.activity).subscribe(
      () => {
        if (this.activity.shape === 'open') {
          this.toastService.show('TOAST_JOINED');
        }
        else {
          this.toastService.show('TOAST_INVITATION_SENT');
          this.close();
        }
      });
  }

  isUserParticipating() {
    return this.participants.map(participant => participant.$key).includes(this.uid);
  }

  isOwnComment(comment: any) {
    return comment.user.$key === this.uid;
  }

  addComment(text: string) {
    this.backendService.addComment(this.activity, text).subscribe(() => this.toastService.show('TOAST_COMMENTED'));
  }
}
