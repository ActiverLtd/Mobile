import { Component, OnInit } from '@angular/core';
import { UserService } from '../../app/user.service';
import { AngularFire } from 'angularfire2';
import { PopoverController } from 'ionic-angular';
import { Activity } from '../../app/activity.interface';
import { ShowActivityPage } from '../show-activity/show-activity';
import { CreateActivityPage } from '../create-activity/create-activity';


@Component({
  templateUrl: './calendar.html'
})
export class CalendarPage implements OnInit {
  activities: any[] = [];

  constructor(private popoverCtrl: PopoverController,
              private af: AngularFire,
              private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getMyActivities().subscribe(activities => this.activities = activities);
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
