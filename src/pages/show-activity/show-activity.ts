import { Component, OnDestroy } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Activity } from '../../app/activity.interface';
import { AngularFire } from 'angularfire2';
import { FirebaseService } from '../../app/firebase.service';
import { UserService } from '../../app/user.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './show-activity.html'
})
export class ShowActivityPage implements OnDestroy {
  activity: Activity;
  uid: string;
  userSubscription: Subscription;

  constructor(params: NavParams,
              private viewController: ViewController,
              private af: AngularFire,
              private userService: UserService,
              private firebaseService: FirebaseService) {
    this.af.database.object(`/activities/${params.get('activityId')}`).subscribe(activity => {
      this.activity = activity;
      this.af.database.object(`/users/${activity.organizer}`).subscribe(
        organizer => this.activity.organizer = organizer
      );
      this.firebaseService.fetchUsersWithAttribute(this.activity, 'comments', 'user');
      this.firebaseService.fetchUsersToArray(this.activity, 'participants');
    });
    this.userSubscription = this.userService.getUser().subscribe(user => this.uid = user.uid);
  }

  participantsByLevel(level: number = undefined) {
    return this.participants.filter(participant => {
      if ((!participant.ratings || !participant.ratings[this.activity.sport])) {
        return !level;
      }
      return participant.ratings[this.activity.sport] === level;
    }).length;
  }

  get participants() {
    if (!(this.activity.participants instanceof Array)) {
      return [this.activity.organizer];
    }
    return this.activity.participants.concat(this.activity.organizer);
  }

  close() {
    this.viewController.dismiss();
  }

  join() {
    this.af.database.list(`/invitations`).push({
      activity: this.activity.$key,
      user: this.uid
    }).then(invitation => {
      this.af.database.list(`/users/${this.activity.organizer.$key}/invitations`).push(invitation.$key);
    });
  }

  isUserParticipating() {
    return this.participants.map(participant => participant.$key).includes(this.uid);
  }

  isOwnComment(comment: any) {
    return comment.user.$key === this.uid;
  }

  addComment(text: string) {
    this.af.database.list(`/activities/${this.activity.$key}/comments`).push({
      user: this.uid,
      text
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
