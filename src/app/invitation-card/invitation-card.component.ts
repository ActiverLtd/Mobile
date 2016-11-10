import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Invitation } from '../invitation.interface';

@Component({
  selector: 'app-invitation-card',
  templateUrl: './invitation-card.component.html'
})
export class InvitationCardComponent {
  @Input()
  invitation: Invitation;

  @Output()
  open: EventEmitter<any> = new EventEmitter();
  @Output()
  reject: EventEmitter<any> = new EventEmitter();
  @Output()
  accept: EventEmitter<any> = new EventEmitter();
}
