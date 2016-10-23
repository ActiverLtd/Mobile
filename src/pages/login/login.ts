import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { NavController } from 'ionic-angular';
import { MainPage } from '../main/main';


@Component({
  templateUrl: './login.html'
})
export class LoginPage implements OnInit {
  constructor(private navCtrl: NavController, public af: AngularFire) {}

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.navCtrl.push(MainPage);
      }
    });
  }
}
