import { NavController, PopoverController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { ActivitiesPage } from '../activities/activities';
import { Component } from '@angular/core';
import { CreateActivityPage } from '../activities/create-activity';
import { ShowActivityPage } from '../activities/show-activity/show-activity';


@Component({
  templateUrl: './main.html'
})
export class MainPage {
  orderBy: string = 'date';
  activities: any[] = [
    {
      id: 24,
      sport: 'football',
      address: 'Hippoksen tie 6, 20720',
      city: 'Turku, Finland',
      time: '14-17',
      date: '6. huhtikuuta',
      participants: [{id: 10}, {},{}, {}, {}, {}, {}, {}],
      participants_max: 10,
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
      address: 'Hippoksen tie 6, 20720',
      city: 'Turku, Finland',
      time: '17-20',
      date: '25. toukokuuta',
      participants: [{}, {}, {}, {}],
      participants_max: 5,
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
      address: 'Hippoksen tie 6, 20720',
      city: 'Turku, Finland',
      time: '17-18',
      date: '21. kesäkuuta',
      participants: [{}, {}],
      participants_max: 6,
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

  get activitiesByOrder() {
    return this.activities.sort((a, b) => {
      if (this.orderBy === 'date') {
        return a.date - b.date;
      }
      else {
        return b.participants.length - a.participants.length;
      }
    })
  }

  openActivities() {
    this.nav.push(ActivitiesPage);
  }

  openProfile() {
    this.nav.push(ProfilePage);
  }

  openActivity(activity, $event) {
    let popover = this.popoverCtrl.create(ShowActivityPage, {activity}, {cssClass: 'show-activity-popover'});
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
