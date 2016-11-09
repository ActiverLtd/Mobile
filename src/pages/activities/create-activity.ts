import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Activity } from '../../app/activity.interface';
import { SportService } from '../../app/sport.service';
import { ViewController } from 'ionic-angular';
import { ToastService } from '../../app/toast.service';


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
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.af.auth.subscribe((auth: any) => {
      this.activity.organizer = auth.auth.uid;
    });
  }

  create() {
    this.activity.timestamp = Date.parse(`${this.date}T${this.time}:00`);
    this.af.database.list('/activities').push(this.activity);
    this.viewController.dismiss();
    this.toastService.show('Aktiviteetti luotu!');
  }

  locationChanged(location) {
    this.activity.location = location;
  }
}
