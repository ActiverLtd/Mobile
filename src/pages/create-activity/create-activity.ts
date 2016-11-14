import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Activity } from '../../app/activity.interface';
import { SportService } from '../../app/sport.service';
import { ViewController } from 'ionic-angular';
import { ToastService } from '../../app/toast.service';
import { UserService } from '../../app/user.service';


@Component({
  templateUrl: `./create-activity.html`
})
export class CreateActivityPage implements OnInit {
  date: any;
  time: any;
  activity: Activity = {
    timestamp: 0,
    sport: 'football',
    location: '',
    participants: [],
    organizer: null,
    participants_max: 2,
    additional_info: '',
    shape: 'open'
  };

  minDate: string = new Date().toISOString();
  maxDate: string = new Date().getFullYear() + 2 + '';

  constructor(private af: AngularFire,
              public sportService: SportService,
              private viewController: ViewController,
              private userService: UserService,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe((user: any) => {
      this.activity.organizer = user.$key;
    });
  }

  create() {
    this.activity.timestamp = Date.parse(`${this.date}T${this.time}:00`);
    this.af.database.list('/activities').push(this.activity);
    this.af.database.list(`/users/${this.activity.organizer}/activities`).push(this.activity.$key);
    this.viewController.dismiss();
    this.toastService.show('TOAST_ACTIVITY_CREATED');
  }

  locationChanged(location) {
    this.activity.location = location;
  }
}
