import { AuthProviders, AuthMethods } from 'angularfire2';

export const firebaseConfig = {
  apiKey: 'AIzaSyCG67JRlhHpSZ2pAVOCUcfGiYLjQ6JIqBA',
  authDomain: 'activer-352db.firebaseapp.com',
  databaseURL: 'https://activer-352db.firebaseio.com',
  storageBucket: 'activer-352db.appspot.co',
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Facebook,
  method: AuthMethods.Redirect
};
