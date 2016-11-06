import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()
export class FirebaseService {
  constructor(private af: AngularFire) {
  }

  fetchUsers(model, listName) {
    if (typeof model[listName] !== 'object') {
      return;
    }
    Object.values(model[listName]).forEach(item => {
      this.af.database.object(`/users/${item}`).subscribe(user => model[listName][item] = user);
    });
  }

  fetchUsersToArray(model, listName) {
    if (typeof model[listName] !== 'object') {
      return;
    }
    const arr = [];
    Object.keys(model[listName]).forEach(item => {
      if (model[listName][item]) {
        this.af.database.object(`/users/${item}`).subscribe(user => arr.push(user));
      }
    });
    model[listName] = arr;
  }

  fetchUsersWithAttribute(model, listName, attributeName) {
    if (typeof model[listName] !== 'object') {
      return;
    }
    Object.values(model[listName]).forEach(item => {
      this.af.database.object(`/users/${item[attributeName]}`).subscribe(
        user => item[attributeName] = user
      );
    });
  }
}
