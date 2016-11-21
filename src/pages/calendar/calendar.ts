import { Component, OnInit } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { Activity } from '../../app/interfaces/activity.interface';
import { ShowActivityPage } from '../show-activity/show-activity';
import { CreateActivityPage } from '../create-activity/create-activity';
import { BackendService } from '../../app/services/backend.service';
import { Observable } from 'rxjs';


@Component({
  templateUrl: './calendar.html'
})
export class CalendarPage implements OnInit {
  activities$: Observable<Activity[]>;

  constructor(private popoverCtrl: PopoverController,
              private backendService: BackendService) {

  }

  ngOnInit() {
    this.activities$ = this.backendService.getUserActivities();
  }

  openActivity(activity: Activity) {
    let popover = this.popoverCtrl.create(ShowActivityPage, {activityId: activity.$key}, {cssClass: 'show-activity-popover'});
    popover.present();
  }

  showCreateActivity($event) {
    let popover = this.popoverCtrl.create(CreateActivityPage, {}, {cssClass: 'large-popover'});
    popover.present({
      ev: $event
    });
  }
}
