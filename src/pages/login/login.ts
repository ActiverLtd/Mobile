import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { NavController, Platform } from 'ionic-angular';
import { MainPage } from '../main/main';
import { BackendService } from '../../app/services/backend.service';
import { Push } from 'ionic-native';


@Component({
  templateUrl: './login.html'
})
export class LoginPage implements OnInit {
  constructor(private navCtrl: NavController,
              private af: AngularFire,
              private platform: Platform,
              private backendService: BackendService) {
  }

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      if (auth) {
        if (this.platform.is('cordova')) {
          const push = Push.init({
            android: {
              senderID: '12345679'
            },
            ios: {
              alert: 'true',
              badge: true,
              sound: 'false'
            },
            windows: {}
          });
          push.on('registration', (data) => {
            alert(JSON.stringify(data));
            alert(data.registrationId);
            this.backendService.storeNotificationId(auth.uid, data.registrationId);
          });
        }
        this.navCtrl.setRoot(MainPage);
      }
    });
  }
}
