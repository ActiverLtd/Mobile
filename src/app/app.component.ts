import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, CodePush } from 'ionic-native';
import { TranslateService } from 'ng2-translate';
import { LoginPage } from '../pages/login/login';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform, translate: TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('fi');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use('fi');
    });

    if (platform.is('cordova')) {
      CodePush.sync().subscribe((syncStatus) => console.log(syncStatus));
    }
  }
}
