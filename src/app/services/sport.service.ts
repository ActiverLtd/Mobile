import { Injectable } from '@angular/core';

@Injectable()
export class SportService {
  private sports: any[] = [
    {name: 'basketball', custom: false},
    {name: 'cycling', custom: false},
    {name: 'football', custom: false},
    {name: 'golf', custom: false},
    {name: 'gym', custom: false},
    {name: 'jogging', custom: false},
    {name: 'random', custom: true},
    {name: 'tennis', custom: false}
  ];

  getSports(includeCustom = true) {
    return this.sports.filter(sport => includeCustom || !sport.custom).map(sport => sport.name);
  }
}
