import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Activity } from '../../app/activity.interface';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html'
})
export class ActivityCardComponent {
  @Input()
  activity: Activity;

  @Output()
  open: EventEmitter<any> = new EventEmitter();
}
