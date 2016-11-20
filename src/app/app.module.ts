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
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { ActivitiesComponent } from './activities/activities.component';
import { LoginPage } from '../pages/login/login';
import { ToastService } from './toast.service';
import { ActivityCardComponent } from './activity-card/activity-card.component';
import { SportService } from './sport.service';
import { NamePipe } from './pipes/name.pipe';
import { NumberToArrayPipe } from './pipes/number-to-array.pipe';
import { firebaseConfig, firebaseAuthConfig } from './firebase-config';
import { ValuesPipe } from './pipes/values.pipe';
import { LocationPickerComponent } from './location-picker/location-picker.component';
import { InvitationCardComponent } from './invitation-card/invitation-card.component';
import { ActivityCommonDetailsComponent } from './activity-common-details/activity-common-details.component';
import { MyActivityCardComponent } from './my-activity-card/my-activity-card.component';
import { BackendService } from './backend.service';

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

