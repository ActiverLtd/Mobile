import { Facebook } from 'ionic-native';
import { Component } from '@angular/core';
import { AngularFire, AngularFireAuth, AuthProviders, FirebaseAuthState } from 'angularfire2';
import { Platform } from 'ionic-angular';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-facebook-login',
  templateUrl: `./facebook-login.component.html`
})
export class FacebookLoginComponent {
  constructor(private platform: Platform, private toastService: ToastService, public af: AngularFire, private auth: AngularFireAuth) {
  }

  login() {
    if (this.platform.is('cordova')) {
      Facebook.login(['email']).then(
        response => this.angularFireAuth(response.authResponse.accessToken),
        error => alert(`Facebook login failed. Error: ${JSON.stringify(error)}`)
      );
    }
    else { // If we aren't in native environment where FB login works, use localStorage-stored value for token
      this.angularFireAuth(localStorage.getItem('FACEBOOK_ACCESS_TOKEN'));
    }
  }

  private angularFireAuth(accessToken) {
    this.auth.login(accessToken, {provider: AuthProviders.Facebook})
      .then((auth: FirebaseAuthState) => {
        const data = auth.auth;
        this.toastService.show('TOAST_SIGNED_IN');
        this.af.database.object(`/users/${auth.uid}`).update({
          image: data.photoURL,
          email: data.email,
          name: data.displayName,
          ratings: {},
          invitations: {}
        })
      })
      .catch((error) => {
        alert("Firebase failure: " + JSON.stringify(error));
      });
  }
}
