import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { NavController } from 'ionic-angular';
import { ToastService } from '../../app/toast.service';
import { Subscription } from 'rxjs';
import { SportService } from '../../app/sport.service';
import { LoginPage } from '../login/login';
import { BackendService } from '../../app/backend.service';


@Component({
  templateUrl: './profile.html'
})
export class ProfilePage implements OnInit, OnDestroy {
  profile: any = {};
  authSubscription: Subscription;
  sports: string[][] = [];

  constructor(private navCtrl: NavController,
              private toastService: ToastService,
              private backendService: BackendService,
              public sportService: SportService,
              public af: AngularFire) {
  }

  ngOnInit() {
    this.sports = this.sportService.getSports().reduce(function (a, b, c) {
      if (c % 2 == 0 && c !== 0) {
        a.push([]);
      }
      a[a.length - 1].push(b);
      return a;
    }, [[]]);


    this.authSubscription = this.backendService.getCurrentUser().subscribe(user => {
      this.profile = user;
      if (!this.profile.ratings) {
        this.profile.ratings = {};
      }
    });
  }

  signOut() {
    if (confirm('Oletko varma, että haluat kirjautua ulos?')) {
      this.af.auth.logout();
      this.toastService.show('TOAST_SIGNED_OUT');
      this.navCtrl.setRoot(LoginPage);
      this.navCtrl.popToRoot();
    }
  }

  hasRating(sport: string) {
    return this.profile.ratings && this.profile.ratings[sport];
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
