import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Activity } from '../../../app/activity.interface';

@Component({
  templateUrl: './show-activity.html'
})
export class ShowActivityPage {
  activity: Activity;

  constructor(params: NavParams, private viewController: ViewController) {
    this.activity = params.get('activity');
  }

  participantsByLevel(level: number) {
    return level;
  }

  close() {
    this.viewController.dismiss();
  }

  join() {

  }

  isUserParticipating() {
    if (this.activity.participants) {
      return this.activity.participants.includes('10');
    }
    return false;
  }
}
