import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Activity } from '../../interfaces/activity.interface';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-show-activity',
  templateUrl: './show-activity.component.html'
})
export class ShowActivityComponent {

  @Input()
  activity: Activity;
  @Input()
  currentUserUid: string;

  @Output()
  join: EventEmitter<Activity> = new EventEmitter<Activity>();
  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  comment: EventEmitter<[Activity, string]> = new EventEmitter<[Activity, string]>();

  participantsByLevel(level: number = undefined) {
    return this.participants.filter(participant => {
      if ((!participant.ratings || !participant.ratings[this.activity.sport])) {
        return !level;
      }
      return participant.ratings[this.activity.sport] === level;
    }).length;
  }

  get participants(): User[] {
    if (!(this.activity.participants instanceof Array)) {
      return [this.activity.organizer];
    }
    return this.activity.participants.concat(this.activity.organizer);
  }


  isUserParticipating() {
    return this.participants.map(participant => participant.$key).includes(this.currentUserUid);
  }

  isOwnComment(comment: any) {
    return comment.user.$key === this.currentUserUid;
  }
}
