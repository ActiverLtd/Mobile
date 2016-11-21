import { Injectable } from '@angular/core';
import { Toast } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

@Injectable()
export class ToastService {
  constructor(private platform: Platform, private translateService: TranslateService) {

  }

  show(key: string, useAsIs = false) {
    if (!useAsIs) {
      this.translateService.get(key).subscribe(text => this.actuallyShow(text));
    }
    else {
      this.actuallyShow(key);
    }
  }
  private actuallyShow(text) {
    if (this.platform.is('cordova')) {
      Toast.show(text, '1500', 'bottom').subscribe();
    }
    else {
      console.log(`Toast: ${text}`);
    }
  }
}
