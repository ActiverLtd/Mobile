import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Activity } from '../../../app/activity.interface';
import { AngularFire } from 'angularfire2';

@Component({
  templateUrl: './show-activity.html'
})
export class ShowActivityPage {
  activity: Activity;
  uid: string;

  constructor(params: NavParams, private viewController: ViewController, private af: AngularFire) {
    this.af.database.object(`/activities/${params.get('activityId')}`).subscribe(activity => {
      this.activity = activity;
      Object.values(this.activity.comments).map(comment => {
        this.af.database.object(`/users/${comment.user}`).subscribe(user => comment.user = user);
      });
      Object.keys(this.activity.participants).map(participant => {
        this.af.database.object(`/users/${participant}`).subscribe(user => this.activity.participants[participant] = user);
      });
    });
    this.af.auth.subscribe(auth => this.uid = auth.uid);
  }

  participantsByLevel(level: number) {
    return level;
  }

  participants() {
    return this.activity.participants;
  }

  close() {
    this.viewController.dismiss();
  }

  join() {
    this.af.database.list(`/activities/${this.activity.$key}/participants`).push(this.uid);
  }

  isUserParticipating() {
    if (this.activity.participants) {
      return Object.values(this.activity.participants).includes(this.uid);
    }
    return false;
  }

  addComment(text: string) {
    this.af.database.list(`/activities/${this.activity.$key}/comments`).push({
      user: this.uid,
      text
    });
  }
}
