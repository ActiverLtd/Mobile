import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { NavController, PopoverController } from 'ionic-angular';
import { ToastService } from '../../app/services/toast.service';
import { Subscription } from 'rxjs';
import { SportService } from '../../app/services/sport.service';
import { LoginPage } from '../login/login';
import { BackendService } from '../../app/services/backend.service';
import { UpdateProfilePage } from '../update-profile/update-profile';


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
              private popoverCtrl: PopoverController,
              public af: AngularFire) {
  }

  ngOnInit() {
    this.sports = this.sportService.getSports(false).reduce(function (a, b, c) {
      if (c % 2 == 0 && c !== 0) {
        a.push([]);
      }
      a[a.length - 1].push(b);
      return a;
    }, [[]]);


    this.authSubscription = this.backendService.getUser().subscribe(user => {
      this.profile = user;
      if (!this.profile.ratings) {
        this.profile.ratings = {};
      }
    });
  }

  edit() {
    let popover = this.popoverCtrl.create(UpdateProfilePage, {}, {cssClass: 'large-popover'});
    popover.present();
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

  isOwnProfile() {
    return this.profile.$key === this.backendService.getCurrentUserUid();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
