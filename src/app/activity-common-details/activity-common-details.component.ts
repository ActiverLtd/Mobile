import { Component, Input } from '@angular/core';
import { Activity } from '../activity.interface';

@Component({
  selector: 'app-activity-common-details',
  templateUrl: './activity-common-details.component.html'
})
export class ActivityCommonDetailsComponent {
  @Input()
  activity: Activity;
}
