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
    this.authSubscription = this.af.auth.subscribe(auth => {
      this.af.database.object(`/users/${auth.uid}`).subscribe(user => this.profile = user);
    });
  }

  signOut() {
    if (confirm('Oletko varma, että haluat kirjautua ulos?')) {
      this.af.auth.logout();
      this.navController.popToRoot();
      this.toastService.show('Signed out');
    }
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
