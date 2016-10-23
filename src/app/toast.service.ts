import { Injectable } from '@angular/core';
import { Toast } from 'ionic-native';
import { Platform } from 'ionic-angular';

@Injectable()
export class ToastService {
  constructor(private platform: Platform) {

  }

  show(text: string) {
    if (this.platform.is('cordova')) {
      Toast.show(text, '1500', 'bottom').subscribe();
    }
    else {
      console.log(`Toast: ${text}`);
    }
  }
}
