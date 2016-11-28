import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { NavController, Platform } from 'ionic-angular';
import { MainPage } from '../main/main';
import { BackendService } from '../../app/services/backend.service';


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
          FCMPlugin.getToken(
            token => this.backendService.storeNotificationId(auth.uid, token),
            err => console.error('Error retrieving FCM token: ' + err)
          );
        }
        this.navCtrl.setRoot(MainPage);
      }
    });
  }
}
