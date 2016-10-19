import { NavController, PopoverController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { ActivitiesPage } from '../activities/activities';
import { Component } from '@angular/core';
import { CreateActivityPage } from '../activities/create-activity';


@Component({
  templateUrl: './main.html'
})
export class MainPage {
  orderBy: string = 'date';
  activities: any[] = [
    {
      id: 24,
      sport: 'football',
      location: 'Tampere',
      time: '14-17',
      date: '6. huhtikuuta',
      participants: 10,
      locked: false,
      organizer: {
        name: 'Roope',
        image: 'http://whatsappdp.net/wp-content/uploads/2016/03/funny-profile-pictures.jpg',
        rating: 5.0
      }
    },
    {
      id: 52,
      sport: 'basketball',
      location: 'Turku',
      time: '17-20',
      date: '25. toukokuuta',
      participants: 4,
      locked: true,
      organizer: {
        name: 'Jesse',
        image: 'http://whatsappdp.net/wp-content/uploads/2016/03/funny-profile-pictures.jpg',
        rating: 3.0
      }
    },
    {
      id: 12,
      sport: 'tennis',
      location: 'Oulu',
      time: '17-18',
      date: '21. kesäkuuta',
      participants: 2,
      locked: true,
      organizer: {
        name: 'Tomi',
        image: 'http://whatsappdp.net/wp-content/uploads/2016/03/funny-profile-pictures.jpg',
        rating: 4.5
      }
    }
  ];

  constructor(private nav: NavController, private popoverCtrl: PopoverController) {
  }

  openActivities() {
    this.nav.push(ActivitiesPage);
  }

  openProfile() {
    this.nav.push(ProfilePage);
  }

  openActivity(activity, $event) {
    let popover = this.popoverCtrl.create(ProfilePage);
    popover.present({
      ev: $event
    });
  }

  createActivity($event) {
    let popover = this.popoverCtrl.create(CreateActivityPage, {}, {cssClass: 'large-popover'});
    popover.present({
      ev: $event
    });
  }
}
