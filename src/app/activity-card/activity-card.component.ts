import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Activity } from '../activity.interface';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html'
})
export class ActivityCardComponent {
  @Input()
  activity: Activity;

  @Output()
  open: EventEmitter<any> = new EventEmitter();
  myStatusExp: string = 'active';

  constructor() {
    setInterval(() => {
      this.myStatusExp = 'inactive';
    }, 2000);
  }
}
