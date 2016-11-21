import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Activity } from '../../interfaces/activity.interface';

@Component({
  selector: 'app-my-activity-card',
  templateUrl: './my-activity-card.component.html'
})
export class MyActivityCardComponent {
  @Input()
  activity: Activity;

  @Output()
  open: EventEmitter<any> = new EventEmitter();
}
