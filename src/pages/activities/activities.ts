import { InvitationsPage } from './invitations/invitations';
import { CalendarPage } from './calendar/calendar';
import { Component } from '@angular/core';


@Component({
  templateUrl: './activities.html'
})
export class ActivitiesPage {
  invitationsTab: InvitationsPage;
  calendarTab: CalendarPage;

  constructor() {
    this.invitationsTab = InvitationsPage;
    this.calendarTab = CalendarPage;
  }
}
