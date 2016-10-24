import { Injectable } from '@angular/core';

@Injectable()
export class SportService {
  private sports: string[] = [
    'basketball',
    'cycling',
    'football',
    'golf',
    'gym',
    'jogging',
    'random',
    'tennis'
  ];
  getSports() {
    return this.sports;
  }
}
