import { Component } from '@angular/core';


@Component({
  templateUrl: `./create-activity.html`
})
export class CreateActivityPage {
  activity: any = {
    date: '2016-10-28',
    time: '22:22'
  };

  create() {

  }
}
