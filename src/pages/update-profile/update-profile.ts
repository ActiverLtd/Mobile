import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { ToastService } from '../../app/services/toast.service';
import { SportService } from '../../app/services/sport.service';
import { BackendService } from '../../app/services/backend.service';
import { Rating } from '../../app/interfaces/rating.interface';
import { User } from '../../app/interfaces/user.interface';


@Component({
  templateUrl: './update-profile.html'
})
export class UpdateProfilePage implements OnInit {
  bio: string;
  ratings: Rating;
  sports: string[];
  user: User;

  constructor(private viewController: ViewController,
              private backendService: BackendService,
              private toastService: ToastService,
              private sportService: SportService) {
  }

  ngOnInit() {
    this.backendService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.bio = user.bio || '';
      this.ratings = Object.assign({}, user.ratings);
      this.sports = this.sportService.getSports(false);
    });
  }

  save() {
    console.log({bio: this.bio, ratings: this.ratings});
    this.backendService.updateProfile({bio: this.bio, ratings: this.ratings});
    this.close();
    this.toastService.show('TOAST_PROFILE_UPDATED');
  }

  close() {
    this.viewController.dismiss();
  }
}
