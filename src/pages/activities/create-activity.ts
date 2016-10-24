import { Component, Input, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Activity } from '../../app/activity.interface';
import { User } from '../../app/user.interface';


@Component({
  templateUrl: `./create-activity.html`
})
export class CreateActivityPage implements OnInit {
  activity: Activity = {
    timestamp: Date.now() + 1000 * 60 * 60 * 24,
    sport: 'football',
    location: '',
    participants: [],
    organizer: null,
    participants_max: 2
  };

  @Input()
  user: User;

  constructor(private af: AngularFire) {
  }

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      this.activity.organizer = auth.auth.uid;
    })
  }

  create() {
    this.af.database.list('/activities').push(this.activity);
  }
}
