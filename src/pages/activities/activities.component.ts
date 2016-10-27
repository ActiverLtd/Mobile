import { PopoverController } from 'ionic-angular';
import { Component } from '@angular/core';
import { CreateActivityPage } from '../activities/create-activity';
import { ShowActivityPage } from '../activities/show-activity/show-activity';
import { AngularFire } from 'angularfire2';
import { BehaviorSubject } from 'rxjs';
import { Activity } from '../../app/activity.interface';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html'
})
export class ActivitiesComponent {
  orderBy: string = 'timestamp';
  activities: Activity[];
  orderBySubject: BehaviorSubject<string>;

  constructor(private popoverCtrl: PopoverController, private af: AngularFire) {
    this.orderBySubject = new BehaviorSubject<string>(this.orderBy);
    const activities = af.database.list('/activities', {
        query: {
          orderByChild: this.orderBySubject
        }
      }
    );

    activities.subscribe(activities => {
      this.activities = activities;
      activities.forEach(activity => {
        this.af.database.object(`/users/${activity.organizer}`).subscribe(user => {
          activity.organizer = user;
        });
      })
    })
  }

  setOrderBy(value: string) {
    this.orderBySubject.next(value);
  }

  openActivity(activity: Activity) {
    let popover = this.popoverCtrl.create(ShowActivityPage, {activity}, {cssClass: 'show-activity-popover'});
    popover.present();
  }

  showCreateActivity($event) {
    let popover = this.popoverCtrl.create(CreateActivityPage, {}, {cssClass: 'large-popover'});
    popover.present({
      ev: $event
    });
  }
}
