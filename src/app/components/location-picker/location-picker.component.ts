import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html'
})
export class LocationPickerComponent implements OnInit {
  @Output()
  selected: EventEmitter<any> = new EventEmitter();
  locationControl = new FormControl();
  predictions$: BehaviorSubject<any[]>;
  selection: any;
  showPredictions = false;
  apiKey = 'AIzaSyBqqdOIVJLTZng9VxPYoWMA03Dhg0SV53s';

  constructor(private http: Http) {

  }

  ngOnInit() {
    this.predictions$ = new BehaviorSubject<any[]>([]);
    this.locationControl.valueChanges
      .debounceTime(750)
      .distinctUntilChanged()
      .switchMap(term => this.http.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${term}&types=geocode&language=fi&key=${this.apiKey}`))
      .map(res => res.json().predictions)
      .do(() => this.showPredictions = true)
      .multicast(this.predictions$).connect();
  }

  selectPrediction(prediction) {
    this.http.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${prediction.place_id}&key=${this.apiKey}`)
      .map(res => res.json())
      .subscribe(data => {
        const place = data.result;
        const addressComponents = place.address_components;
        const location = {
          name: place.name,
          address: {
            street: addressComponents[0] ? addressComponents[0].long_name : '',
            city: addressComponents[1] ? addressComponents[1].long_name : '',
            country: addressComponents[3] ? addressComponents[3].long_name : ''
          },
          location: place.geometry.location
        };
        this.showPredictions = false;
        this.selection = location;
        this.locationControl.patchValue(location.name, {emitEvent: false});
        this.selected.emit(location);
      });
  }
}
