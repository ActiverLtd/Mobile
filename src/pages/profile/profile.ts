import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { NavController } from 'ionic-angular';
import { ToastService } from '../../app/toast.service';


@Component({
  templateUrl: './profile.html'
})
export class ProfilePage {
  constructor(private navController: NavController, private toastService: ToastService, public af: AngularFire) {}

  signOut() {
    if (confirm('Oletko varma, että haluat kirjautua ulos?')) {
      this.af.auth.logout();
      this.navController.popToRoot();
      this.toastService.show('Signed out');
    }
  }
}
