import 'firebase';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { MyActivitiesPage } from '../pages/activities/my-activities';
import { MainPage } from '../pages/main/main';
import { ProfilePage } from '../pages/profile/profile';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';
import { Http } from '@angular/http';
import { CreateActivityPage } from '../pages/activities/create-activity';
import { InvitationsPage } from '../pages/activities/invitations/invitations';
import { CalendarPage } from '../pages/activities/calendar/calendar';
import { ShowActivityPage } from '../pages/activities/show-activity/show-activity';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { ActivitiesComponent } from '../pages/activities/activities.component';
import { LoginPage } from '../pages/login/login';
import { ToastService } from './toast.service';

const myFirebaseConfig = {
  apiKey: 'AIzaSyCG67JRlhHpSZ2pAVOCUcfGiYLjQ6JIqBA',
  authDomain: 'activer-352db.firebaseapp.com',
  databaseURL: 'https://activer-352db.firebaseio.com',
  storageBucket: 'activer-352db.appspot.co',
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Facebook,
  method: AuthMethods.Redirect
};

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MyActivitiesPage,
    MainPage,
    ProfilePage,
    CreateActivityPage,
    InvitationsPage,
    CalendarPage,
    ShowActivityPage,
    ActivitiesComponent,
    FacebookLoginComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [Http]
    }),
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MyActivitiesPage,
    MainPage,
    ProfilePage,
    CreateActivityPage,
    InvitationsPage,
    CalendarPage,
    ShowActivityPage,
    ActivitiesComponent,
    FacebookLoginComponent
  ],
  providers: [ToastService]
})
export class AppModule {}
