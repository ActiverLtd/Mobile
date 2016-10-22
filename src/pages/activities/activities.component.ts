import { PopoverController } from 'ionic-angular';
import { Component } from '@angular/core';
import { CreateActivityPage } from '../activities/create-activity';
import { ShowActivityPage } from '../activities/show-activity/show-activity';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html'
})
export class ActivitiesComponent {
  orderBy: string = 'timestamp';
  activities: FirebaseListObservable<any[]>;
  orderBySubject: BehaviorSubject<string>;

  constructor(private popoverCtrl: PopoverController, private af: AngularFire) {
    this.orderBySubject = new BehaviorSubject<string>(this.orderBy);
    this.activities = af.database.list('/activities', {
        query: {
          orderByChild: this.orderBySubject
        }
      }
      );
  }

  setOrderBy(value: string) {
    alert(`Set order by for activities to be ${value}`);
    this.orderBySubject.next(value);
  }

  openActivity(activity, $event) {
    let popover = this.popoverCtrl.create(ShowActivityPage, {activity}, {cssClass: 'show-activity-popover'});
    popover.present({
      ev: $event
    });
  }

  createActivity($event) {
    let popover = this.popoverCtrl.create(CreateActivityPage, {}, {cssClass: 'large-popover'});
    popover.present({
      ev: $event
    });
  }
}
