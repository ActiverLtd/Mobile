import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Activity } from '../../../app/activity.interface';
import { AngularFire } from 'angularfire2';
import { FirebaseService } from '../../../app/firebase.service';

@Component({
  templateUrl: './show-activity.html'
})
export class ShowActivityPage {
  activity: Activity;
  uid: string;

  constructor(params: NavParams,
              private viewController: ViewController,
              private af: AngularFire,
              private firebaseService: FirebaseService) {
    this.af.database.object(`/activities/${params.get('activityId')}`).subscribe(activity => {
      this.activity = activity;
      this.firebaseService.fetchUsersWithAttribute(this.activity, 'comments', 'user');
      this.firebaseService.fetchUsersToArray(this.activity, 'participants');
    });
    this.af.auth.subscribe(auth => this.uid = auth.uid);
  }

  participantsByLevel(level: number) {
    return level;
  }

  get participants() {
    if (!(this.activity.participants instanceof Array)) {
      return [];
    }
    return this.activity.participants;
  }

  close() {
    this.viewController.dismiss();
  }

  join() {
    this.af.database.object(`/activities/${this.activity.$key}/participants/${this.uid}`).set(true);
  }

  isUserParticipating() {
    return this.participants.map(participant => participant.$key).includes(this.uid);
  }

  addComment(text: string) {
    this.af.database.list(`/activities/${this.activity.$key}/comments`).push({
      user: this.uid,
      text
    });
  }
}
