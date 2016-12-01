import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Activity } from '../../app/interfaces/activity.interface';
import { ToastService } from '../../app/services/toast.service';
import { BackendService } from '../../app/services/backend.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './show-activity.html'
})
export class ShowActivityPage implements OnInit {
  activity$: Observable<Activity>;
  uid: string;

  constructor(private params: NavParams,
              private viewController: ViewController,
              private toastService: ToastService,
              private backendService: BackendService) {
  }

  ngOnInit() {
    this.activity$ = this.backendService.getActivity(this.params.get('activityId'));
    this.uid = this.backendService.getCurrentUserUid();
  }

  close() {
    return this.viewController.dismiss();
  }

  join(activity: Activity) {
    this.backendService.joinActivity(activity);
    if (activity.shape === 'open') {
      this.toastService.show('TOAST_JOINED');
    }
    else {
      this.toastService.show('TOAST_INVITATION_SENT');
      this.close();
    }
  }

  leave(activity: Activity) {
    this.close().then(() => {
      this.backendService.leaveActivity(activity);
    });
  }

  comment(data: [Activity, string]) {
    this.backendService.addComment(data[0], data[1]);
    this.toastService.show('TOAST_COMMENTED');
  }
}
