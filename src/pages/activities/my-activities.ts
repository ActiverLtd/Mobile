import { InvitationsPage } from './invitations/invitations';
import { CalendarPage } from './calendar/calendar';
import { Component } from '@angular/core';


@Component({
  templateUrl: './my-activities.html'
})
export class MyActivitiesPage {
  invitationsTab: InvitationsPage;
  calendarTab: CalendarPage;

  constructor() {
    this.invitationsTab = InvitationsPage;
    this.calendarTab = CalendarPage;
  }
}
