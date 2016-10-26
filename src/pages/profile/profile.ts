import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { NavController } from 'ionic-angular';
import { ToastService } from '../../app/toast.service';
import { Subscription } from 'rxjs';


@Component({
  templateUrl: './profile.html'
})
export class ProfilePage implements OnInit, OnDestroy {
  profile: any = {};
  authSubscription: Subscription;

  constructor(private navController: NavController, private toastService: ToastService, public af: AngularFire) {
  }

  ngOnInit() {
    this.authSubscription = this.af.auth.subscribe(auth => this.profile = auth.auth);
  }

  signOut() {
    if (confirm('Oletko varma, että haluat kirjautua ulos?')) {
      this.af.auth.logout();
      this.navController.popToRoot();
      this.toastService.show('Signed out');
    }
  }

  getNameParts(index: number) {
    if (this.profile.displayName) {
      const parts = this.profile.displayName.split(' ');
      if (parts.length === 1) {
        return parts[0];
      }
      else if (parts.length === 2) {
        return parts[index];
      }
      else if (parts.length > 2) { // More parts than in traditional name (first name + last name)
        if (index === 1) { // If trying to take last part, lets take the absolutely last part
          index = parts.length - 1;
        }
        return parts[index];
      }
    }
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
