import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Geocoder, GeocoderResult } from 'ionic-native';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html'
})
export class LocationPickerComponent implements OnInit {
  @Output()
  selected: EventEmitter<any> = new EventEmitter();

  locations: any[];
  selection: any;

  constructor(private platform: Platform) {

  }

  ngOnInit() {
    this.locationSelected({
      name: 'Tesoman palloiluhalli',
      address: {
        street: 'Tesoman valtatie 46',
        zip: '33310',
        city: 'Tampere',
        country: 'Finland'
      },
      location: {
        lat: 61.509168,
        lng: 23.627059
      }
    });
  }

  locationSelected(value) {
    this.selection = value;
    this.selected.emit(value);
  }

  change(term: string) {
    if (this.platform.is('cordova')) {
      Geocoder.geocode({address: term}).then((result: GeocoderResult[]) => {
        this.locations = result.map(location => {
          return {
            name: 'asd',
            location: {
              lat: 0,
              lng: 0
            }
          }
        });
      });
    }
  }
}
