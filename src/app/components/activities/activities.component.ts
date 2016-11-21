import { PopoverController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { CreateActivityPage } from '../../../pages/create-activity/create-activity';
import { ShowActivityPage } from '../../../pages/show-activity/show-activity';
import { BehaviorSubject, Observable } from 'rxjs';
import { Activity } from '../../interfaces/activity.interface';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html'
})
export class ActivitiesComponent implements OnInit {
  orderBy: string = 'timestamp';
  activities: Observable<Activity[]>;
  orderBySubject: BehaviorSubject<string>;

  constructor(private popoverCtrl: PopoverController, private backendService: BackendService) {

  }

  ngOnInit() {
    this.orderBySubject = new BehaviorSubject<string>(this.orderBy);
    this.activities = this.backendService.getActivities(this.orderBySubject);
  }

  setOrderBy(value: string) {
    this.orderBySubject.next(value);
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
