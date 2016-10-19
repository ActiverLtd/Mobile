import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  templateUrl: './show-activity.html'
})
export class ShowActivityPage {
  activity: any;

  constructor(public params: NavParams) {
    this.activity = params.get('activity');
  }

  participantsByLevel(level: number) {
    return level;
  }
}
