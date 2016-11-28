import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, CodePush, Splashscreen, SyncStatus } from 'ionic-native';
import { TranslateService } from 'ng2-translate';
import { LoginPage } from '../pages/login/login';
import { ToastService } from './services/toast.service';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform, translate: TranslateService, toastService: ToastService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('fi');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use('fi');


      if (platform.is('cordova')) {
        CodePush.sync().subscribe((syncStatus) => {
          if (syncStatus === SyncStatus.UPDATE_INSTALLED) {
            toastService.show('TOAST_UPDATES_INSTALLED');
          }
        });
        window.setTimeout(() => {
          Splashscreen.hide();
        }, 300);
        FCMPlugin.onNotification(
          (data) => {
            if (data.wasTapped) { // Notification was received on device tray and tapped by the user.
              alert(JSON.stringify(data));
            }
            else { // Notification was received in foreground. Maybe the user needs to be notified.
              alert(JSON.stringify(data));
            }
          },
          (msg) => {
            console.log('onNotification callback successfully registered: ' + msg);
          },
          (err) => {
            alert('Error registering onNotification callback: ' + err);
          }
        );
      }
    });
  }
}
