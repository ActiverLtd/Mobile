import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';


@Component({
  templateUrl: `./create-activity.html`
})
export class CreateActivityPage {
  activity: any = {
    date: '2016-10-28',
    time: '22:22'
  };

  constructor(private af: AngularFire) {

  }

  create() {
    this.af.database.list('/activities').push(this.activity);
  }
}
