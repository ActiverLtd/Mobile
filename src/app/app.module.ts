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
import { AngularFireModule } from 'angularfire2';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { ActivitiesComponent } from '../pages/activities/activities.component';
import { LoginPage } from '../pages/login/login';
import { ToastService } from './toast.service';
import { ActivityCardComponent } from '../pages/activities/activity-card.component';
import { SportService } from './sport.service';
import { NamePipe } from './pipes/name.pipe';
import { NumberToArrayPipe } from './pipes/number-to-array.pipe';
import { firebaseConfig, firebaseAuthConfig } from './firebase-config';
import { ValuesPipe } from './pipes/values.pipe';

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
    ActivityCardComponent,
    FacebookLoginComponent,
    NamePipe,
    NumberToArrayPipe,
    ValuesPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [Http]
    }),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
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
    ActivityCardComponent,
    FacebookLoginComponent
  ],
  providers: [ToastService, SportService]
})
export class AppModule {
}

