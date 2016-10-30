import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { NavController } from 'ionic-angular';
import { ToastService } from '../../app/toast.service';
import { Subscription } from 'rxjs';
import { SportService } from '../../app/sport.service';


@Component({
  templateUrl: './profile.html'
})
export class ProfilePage implements OnInit, OnDestroy {
  profile: any = {};
  authSubscription: Subscription;
  sports: string[][] = [];

  constructor(
    private navController: NavController,
    private toastService: ToastService,
    public sportService: SportService,
    public af: AngularFire) {
  }

  ngOnInit() {
    this.sports = this.sportService.getSports().reduce(function(a, b, c){
      if(c % 2 == 0  && c !== 0){
        a.push([]); };
      a[a.length - 1].push(b);
      return a;
    }, [[]]);


    this.authSubscription = this.af.auth.subscribe(auth => {
      this.af.database.object(`/users/${auth.uid}`).subscribe(user => {
        this.profile = user;
        if (!this.profile.ratings) {
          this.profile.ratings = {};
        }
      });
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
