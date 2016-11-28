import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Activity } from '../../app/interfaces/activity.interface';
import { ToastService } from '../../app/services/toast.service';
import { BackendService } from '../../app/services/backend.service';
import { Observable } from 'rxjs';
import { TranslateService } from 'ng2-translate';

@Component({
  templateUrl: './show-activity.html'
})
export class ShowActivityPage implements OnInit {
  activity$: Observable<Activity>;
  uid: string;

  constructor(private params: NavParams,
              private viewController: ViewController,
              private toastService: ToastService,
              private translateService: TranslateService,
              private backendService: BackendService) {
  }

  ngOnInit() {
    this.activity$ = this.backendService.getActivity(this.params.get('activityId'));
    this.uid = this.backendService.getLastUid();
  }

  close() {
    this.viewController.dismiss();
  }

  join(activity: Activity) {
    this.backendService.joinActivity(activity).subscribe(
      () => {
        if (activity.shape === 'open') {
          this.toastService.show('TOAST_JOINED');
        }
        else {
          this.toastService.show('TOAST_INVITATION_SENT');
          this.close();
        }
      });
  }

  leave(activity: Activity) {
    if (confirm(this.translateService.instant('CONFIRM_LEAVE'))) {
      this.backendService.leaveActivity(activity);
      this.close();
    }
  }

  comment(data: [Activity, string]) {
    this.backendService.addComment(data[0], data[1]).subscribe(() => this.toastService.show('TOAST_COMMENTED'));
  }
}
