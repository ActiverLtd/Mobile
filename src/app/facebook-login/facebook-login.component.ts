import { Facebook } from 'ionic-native';
import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Platform } from 'ionic-angular';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-facebook-login',
  templateUrl: `./facebook-login.component.html`
})
export class FacebookLoginComponent {
  constructor(private platform: Platform, private toastService: ToastService, public af: AngularFire) {
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
    const provider = firebase.auth.FacebookAuthProvider.credential(accessToken);
    firebase.auth().signInWithCredential(provider)
      .then((auth) => {
        this.toastService.show('TOAST_SIGNED_IN');
        this.af.database.object(`/users/${auth.uid}`).update({
          image: auth.photoURL,
          email: auth.email,
          name: auth.displayName,
          ratings: {},
          invitations: {abc: true}
        })
      })
      .catch((error) => {
        alert("Firebase failure: " + JSON.stringify(error));
      });
  }
}
