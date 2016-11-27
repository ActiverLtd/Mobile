import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { NavController } from 'ionic-angular';
import { MainPage } from '../main/main';
import { BackendService } from '../../app/services/backend.service';


@Component({
  templateUrl: './login.html'
})
export class LoginPage implements OnInit {
  constructor(private navCtrl: NavController, private af: AngularFire, private backendService: BackendService) {
  }

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      if (auth) {
        FCMPlugin.getToken(
          token => this.backendService.storeNotificationId(auth.uid, token),
          err => console.error('Error retrieving FCM token: ' + err)
        );
        this.navCtrl.setRoot(MainPage);
      }
    });
  }
}
