import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { ActivitiesPage } from '../pages/activities/activities';
import { MainPage } from '../pages/main/main';
import { ProfilePage } from '../pages/profile/profile';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';
import { Http } from '@angular/http';
import { CreateActivityPage } from '../pages/activities/create-activity';
import { InvitationsPage } from '../pages/activities/invitations/invitations';
import { CalendarPage } from '../pages/activities/calendar/calendar';
import { ShowActivityPage } from '../pages/activities/show-activity/show-activity';

@NgModule({
  declarations: [
    MyApp,
    ActivitiesPage,
    MainPage,
    ProfilePage,
    CreateActivityPage,
    InvitationsPage,
    CalendarPage,
    ShowActivityPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ActivitiesPage,
    MainPage,
    ProfilePage,
    CreateActivityPage,
    InvitationsPage,
    CalendarPage,
    ShowActivityPage
  ],
  providers: []
})
export class AppModule {}
