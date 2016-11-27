import { NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { MyActivitiesPage } from '../pages/my-activities/my-activities';
import { MainPage } from '../pages/main/main';
import { ProfilePage } from '../pages/profile/profile';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';
import { Http } from '@angular/http';
import { CreateActivityPage } from '../pages/create-activity/create-activity';
import { InvitationsPage } from '../pages/invitations/invitations';
import { CalendarPage } from '../pages/calendar/calendar';
import { ShowActivityPage } from '../pages/show-activity/show-activity';
import { AngularFireModule } from 'angularfire2';
import { FacebookLoginComponent } from './components/facebook-login/facebook-login.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { LoginPage } from '../pages/login/login';
import { ToastService } from './services/toast.service';
import { ActivityCardComponent } from './components/activity-card/activity-card.component';
import { SportService } from './services/sport.service';
import { NamePipe } from './pipes/name.pipe';
import { NumberToArrayPipe } from './pipes/number-to-array.pipe';
import { firebaseConfig, firebaseAuthConfig } from './firebase-config';
import { ValuesPipe } from './pipes/values.pipe';
import { LocationPickerComponent } from './components/location-picker/location-picker.component';
import { InvitationCardComponent } from './components/invitation-card/invitation-card.component';
import { ActivityCommonDetailsComponent } from './components/activity-common-details/activity-common-details.component';
import { MyActivityCardComponent } from './components/my-activity-card/my-activity-card.component';
import { BackendService } from './services/backend.service';
import { ShowActivityComponent } from './components/show-activity/show-activity.component';
import { UpdateProfilePage } from '../pages/update-profile/update-profile';

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
    UpdateProfilePage,
    ShowActivityPage,
    ShowActivityComponent,
    ActivitiesComponent,
    ActivityCardComponent,
    ActivityCommonDetailsComponent,
    MyActivityCardComponent,
    InvitationCardComponent,
    FacebookLoginComponent,
    LocationPickerComponent,
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
    UpdateProfilePage,
    CalendarPage,
    ShowActivityPage,
    ActivitiesComponent,
    ActivityCardComponent,
    FacebookLoginComponent
  ],
  providers: [
    ToastService, SportService, BackendService,
    {provide: LOCALE_ID, useValue: 'fi-FI'}
  ]
})
export class AppModule {
}

window.onerror = function (message, url, lineNumber) {
  alert(`ERROR: ${message}\n${url}:${lineNumber}`);
  return true;
};
