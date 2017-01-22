import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { Observable, BehaviorSubject } from 'rxjs';
import { Invitation } from '../interfaces/invitation.interface';
import { Activity } from '../interfaces/activity.interface';
import { User } from '../interfaces/user.interface';
import { NotificationService } from './notification.service';

@Injectable()
export class BackendService {
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private af: AngularFire, private notificationService: NotificationService) {
    this.af.auth.switchMap((auth: FirebaseAuthState) => {
        if (!auth) {
          return Observable.of({});
        }
        return this.af.database.object(`/users/${auth.auth.uid}`);
      }
    ).subscribe(this.user$);
  }

  getUser() {
    return this.user$;
  }

  getCurrentUser() {
    return this.user$.getValue();
  }

  getCurrentUserUid() {
    return this.getCurrentUser().$key;
  }

  getActivities(orderBySubject: BehaviorSubject<string>): Observable<Activity[]> {
    const activities$ = this.af.database.list('/activities', {
        query: {
          orderByChild: orderBySubject
        }
      }
    );

    return activities$.switchMap((activities) => {
      return Observable.zip(
        ...activities
          .filter(activity => !this.isUserParticipating(activity, this.getCurrentUserUid()))
          .map(activity => this.fetchOrganizer(activity).map(() => activity))
      );
    });
  }

  getActivity(activityUid: string): Observable<Activity> {
    return this.af.database.object(`/activities/${activityUid}`).switchMap((activity: Activity) => {
      return this.getActivityDetails(activity, true);
    });
  }

  getUserActivities() {
    return this.user$.switchMap(currentUser => {
      if (!currentUser.activity_list) {
        return Observable.of([]);
      }
      return Observable.zip(
        ...Object.keys(currentUser.activity_list)
          .map(id => this.af.database.object(`/activities/${id}`).switchMap(activity => {
              return Observable.zip(this.fetchOrganizer(activity), this.fetchParticipants(activity)).mapTo(activity);
            })
          ));
    });
  }

  getInvitations(): Observable<Invitation[]> {
    return this.user$.switchMap(currentUser => {
      if (!currentUser || !currentUser.invitation_list || !Object.keys(currentUser.invitation_list).length) {
        return Observable.of([]);
      }
      return Observable.combineLatest(...Object.keys(currentUser.invitation_list)
        .map(id => this.af.database.object(`/invitations/${id}`)
          .switchMap(invitation => {
            return Observable.combineLatest(
              this.af.database.object(`/activities/${invitation.activity_uid}`), this.fetchUser(invitation.user_uid)
            ).switchMap(
              ([activity, user]) => {
                invitation.activity = activity;
                invitation.user = user;
                return this.getActivityDetails(activity, false);
              }
            ).mapTo(invitation)
          })));
    });
  }

  createActivity(activity: Activity) {
    activity.organizer_uid = this.getCurrentUserUid();
    const activityRef = this.af.database.list('/activities').push(activity);
    this.af.database.object(`/users/${activity.organizer_uid}/activity_list`).update({[activityRef.key]: true});
  }

  joinActivity(activity: Activity) {
    const uid = this.getCurrentUserUid();
    if (activity.shape === 'open') {
      this.af.database.object(`/users/${uid}/activity_list`).update({[activity.$key]: true});
      this.af.database.object(`/activities/${activity.$key}/participant_list`).update({[uid]: true});
    }
    else {
      const invitation: any = this.af.database.list(`/invitations`).push({
        activity_uid: activity.$key,
        user_uid: uid
      });
      this.af.database.object(`/users/${activity.organizer.$key}/invitation_list`).update({[invitation.key]: true});
      this.af.database.object(`/activities/${activity.$key}/invitation_list`).update({[invitation.key]: true});
      this.notificationService.newInvitation(activity.organizer_uid);
    }
  }

  leaveActivity(activity: Activity) {
    const uid = this.getCurrentUserUid();
    if (uid === activity.organizer_uid) { // If user is organizer
      activity.participants.forEach((user) => {
        this.af.database.object(`/users/${user.uid}/activity_list/${activity.$key}`).remove();
      });
      if (activity.invitation_list) {
        Object.keys(activity.invitation_list).forEach((invitation_uid) => {
          this.actuallyRemoveInvitation(invitation_uid, activity.organizer_uid);
        });
      }
      this.af.database.object(`/activities/${activity.$key}`).remove();
    }
    else {
      this.af.database.object(`/activities/${activity.$key}/participant_list/${uid}`).remove();
    }
    this.af.database.object(`/users/${uid}/activity_list/${activity.$key}`).remove();
  }

  addComment(activity: Activity, text: string) {
    this.af.database.list(`/activities/${activity.$key}/comments`).push({
      user_uid: this.getCurrentUserUid(),
      text
    });
    this.notificationService.newComment(activity, this.getCurrentUser().name, text, this.getCurrentUserUid());
  }

  rejectInvitation(invitation: Invitation) {
    this.removeInvitation(invitation);
  }

  acceptInvitation(invitation: Invitation) {
    this.af.database.object(`/activities/${invitation.activity_uid}/participant_list`).update({[invitation.user_uid]: true});
    this.af.database.object(`/users/${invitation.user_uid}/activity_list`).update({[invitation.activity_uid]: true});
    this.notificationService.acceptInvitation(invitation);
    this.removeInvitation(invitation);
  }

  updateProfile(updateObject: any) {
    this.fetchUser(this.getCurrentUserUid()).update(updateObject);
  }

  storeNotificationId(uid: string, notificationId: string) {
    this.fetchUser(uid).update({notificationId});
  }

  private fetchOrganizer(activity: Activity): Observable<User> {
    return this.fetchUser(activity.organizer_uid).do(organizer => activity.organizer = organizer);
  }

  private fetchUser(uid: string) {
    return this.af.database.object(`/users/${uid}`);
  }

  private getActivityDetails(activity: Activity, fetchCommentUsers = false): Observable<Activity> {
    return Observable.combineLatest(
      this.fetchOrganizer(activity),
      this.fetchParticipants(activity),
      fetchCommentUsers ? this.fetchUsersForComments(activity) : Observable.of([])
    ).mapTo(activity);
  }

  private removeInvitation(invitation) {
    this.actuallyRemoveInvitation(invitation.$key, invitation.activity.organizer.$key);
  }

  private actuallyRemoveInvitation(invitationUid, organizerUid) {
    this.af.database.object(`/invitations/${invitationUid}`).remove();
    this.af.database.object(`/users/${organizerUid}/invitation_list/${invitationUid}`).remove();
  }

  private isUserParticipating(activity: Activity, uid: string) {
    return this.isUserOrganizer(activity, uid) || this.isUserParticipant(activity, uid);
  }

  private isUserOrganizer(activity: Activity, uid: string) {
    return activity.organizer_uid === uid;
  }

  private isUserParticipant(activity: Activity, uid: string) {
    return typeof activity.participant_list === 'object' && Object.keys(activity.participant_list).includes(uid);
  }

  private fetchParticipants(activity: Activity) {
    return this.fetchUsersToArray(activity, 'participant_list').do(participants => activity.participants = participants);
  }

  private fetchUsersForComments(activity: Activity) {
    return this.fetchUsersWithAttribute(activity, 'comments');
  }

  private fetchUsersToArray(model, listName) {
    if (typeof model[listName] !== 'object') {
      return Observable.of([]);
    }

    const users$ = Object.keys(model[listName])
      .filter(item => model[listName][item])
      .map(item => this.af.database.object(`/users/${item}`));
    return Observable.combineLatest(...users$);
  }

  private fetchUsersWithAttribute(model, listName) {
    if (typeof model[listName] !== 'object') {
      return Observable.of([]);
    }
    const user$ = Object.values(model[listName])
      .map(item => this.af.database.object(`/users/${item['user_uid']}`).map(user => {
        item['user'] = user;
        return item;
      }));
    return Observable.combineLatest(...user$);
  }
}
