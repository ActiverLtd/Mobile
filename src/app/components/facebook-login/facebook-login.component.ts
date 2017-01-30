import { Facebook } from 'ionic-native';
import { Component } from '@angular/core';
import { AngularFire, AngularFireAuth, AuthProviders, FirebaseAuthState, AuthMethods } from 'angularfire2';
import { Platform } from 'ionic-angular';
import { ToastService } from '../../services/toast.service';
import * as firebase from 'firebase';

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
    let creds = firebase.auth.FacebookAuthProvider.credential(accessToken);
    this.auth.login(creds, {provider: AuthProviders.Facebook, method: AuthMethods.OAuthToken})
      .then((auth: FirebaseAuthState) => {
        this.toastService.show('TOAST_SIGNED_IN');
        const data = auth.auth;
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
