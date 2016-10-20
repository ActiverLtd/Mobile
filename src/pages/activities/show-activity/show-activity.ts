import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: './show-activity.html'
})
export class ShowActivityPage {
  activity: any;

  constructor(params: NavParams, private viewController: ViewController) {
    this.activity = params.get('activity');
  }

  participantsByLevel(level: number) {
    return level;
  }

  close() {
    this.viewController.dismiss();
  }
}
