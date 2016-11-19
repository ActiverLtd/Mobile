import { Component, OnInit } from '@angular/core';
import { Activity } from '../../app/activity.interface';
import { SportService } from '../../app/sport.service';
import { ViewController } from 'ionic-angular';
import { ToastService } from '../../app/toast.service';
import { BackendService } from '../../app/backend.service';


@Component({
  templateUrl: `./create-activity.html`
})
export class CreateActivityPage implements OnInit {
  date: any;
  time: any = `18:00`;
  activity: Activity = {
    timestamp: 0,
    sport: 'football',
    location: {},
    participant_list: [],
    organizer_uid: null,
    participants_max: 2,
    additional_info: '',
    shape: 'open',
    comments: []
  };

  minDate: string = new Date().toISOString();
  maxDate: string = new Date().getFullYear() + 2 + '';

  constructor(public sportService: SportService,
              private viewController: ViewController,
              private backendService: BackendService,
              private toastService: ToastService) {
  }

  ngOnInit() {
    const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    this.date = `${tomorrow.getFullYear()}-${tomorrow.getMonth() + 1}-${tomorrow.getDate()}`;
  }

  create() {
    this.activity.timestamp = Date.parse(`${this.date}T${this.time}:00`);
    this.backendService.createActivity(this.activity).subscribe(() => {
      this.viewController.dismiss();
      this.toastService.show('TOAST_ACTIVITY_CREATED');
    });
  }

  locationChanged(location) {
    this.activity.location = location;
  }
}
