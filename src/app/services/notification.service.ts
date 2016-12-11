import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Invitation } from '../interfaces/invitation.interface';
import { TranslateService } from 'ng2-translate';
import { Activity } from '../interfaces/activity.interface';
import { Observable } from 'rxjs';

@Injectable()
export class NotificationService {
  constructor(private http: Http,
              private translateService: TranslateService) {

  }


  newInvitation(organizerUid: string) {
    this.sendNotification(
      organizerUid,
      this.translateService.instant('NOTIFICATIONS.NEW_INVITATION.TITLE'),
      this.translateService.instant('NOTIFICATIONS.NEW_INVITATION.TEXT'),
      {}
    );
  }

  acceptInvitation(invitation: Invitation) {
    this.sendNotification(
      invitation.user_uid,
      this.translateService.instant('NOTIFICATIONS.INVITATION_ACCEPTED.TITLE'),
      this.translateService.instant('NOTIFICATIONS.INVITATION_ACCEPTED.TEXT'),
      {}
    );
  }

  newComment(activity: Activity, name: string, text: string, currentUserUid: string) {
    let participantList = activity.participant_list;
    if (!participantList) {
      participantList = [activity.organizer_uid];
    }
    else {
      participantList = Object.keys(participantList).concat(activity.organizer_uid)
    }
    participantList.forEach((participant_uid) => {
      if (participant_uid !== currentUserUid) {
        this.sendNotification(
          participant_uid,
          this.translateService.instant('NOTIFICATIONS.NEW_COMMENT.TITLE'),
          this.translateService.instant('NOTIFICATIONS.NEW_COMMENT.TEXT', {text, name}),
          {}
        );
      }
    });
  }

  private sendNotification(uid: string, title: string, text: string, data: any) {
    this.http.post(
      'https://d7okhwa7l2.execute-api.us-west-2.amazonaws.com/prod/sendPushNotification',
      {uid, title, text, data}
    ).catch(() => Observable.empty()).subscribe();
  }
}
