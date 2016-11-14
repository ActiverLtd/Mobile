import { PopoverController } from 'ionic-angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateActivityPage } from '../../pages/create-activity/create-activity';
import { ShowActivityPage } from '../../pages/show-activity/show-activity';
import { AngularFire } from 'angularfire2';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Activity } from '../activity.interface';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html'
})
export class ActivitiesComponent implements OnInit, OnDestroy {
  orderBy: string = 'timestamp';
  activities: Activity[];
  activitiesSubscription: Subscription;
  orderBySubject: BehaviorSubject<string>;

  constructor(private popoverCtrl: PopoverController, private af: AngularFire) {

  }

  ngOnInit() {
    this.orderBySubject = new BehaviorSubject<string>(this.orderBy);
    const activities = this.af.database.list('/activities', {
        query: {
          orderByChild: this.orderBySubject
        }
      }
    );

    this.activitiesSubscription = Observable.combineLatest(activities, this.af.auth.map(auth => {
      if (!auth) {
        return -1;
      }
      return auth.uid;
    })).subscribe(([activities, uid]) => {
      this.activities = activities.filter(activity => {
        return activity.organizer !== uid && (typeof activity.participants !== 'object' || !Object.keys(activity.participants).includes(uid));
      });
      this.activities.forEach(activity => {
        this.af.database.object(`/users/${activity.organizer}`).subscribe(user => {
          activity.organizer = user;
        });
      })
    });
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

  ngOnDestroy() {
    this.activitiesSubscription.unsubscribe();
  }
}
