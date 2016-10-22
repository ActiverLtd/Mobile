import { Facebook, FacebookLoginResponse } from 'ionic-native';
import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-facebook-login',
  templateUrl: `./facebook-login.component.html`
})
export class FacebookLoginComponent {
  constructor(public af: AngularFire) {
  }

  login() {
    // Facebook.browserInit(375866282577187).then(() => {
    Facebook.login(['email']).then(
      response => this.angularFireAuth(response),
      error => alert(`Facebook login failed. Error: ${JSON.stringify(error)}`)
    );
    // });
  }

  private angularFireAuth(response: FacebookLoginResponse) {
    const provider = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

    firebase.auth().signInWithCredential(provider)
      .then((success) => {
        alert("Firebase success: " + JSON.stringify(success));
      })
      .catch((error) => {
        alert("Firebase failure: " + JSON.stringify(error));
      });
  }
}
