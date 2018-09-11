import { Component, OnInit } from '@angular/core';
import { WeatherStationService } from '../../services/weatherstation/weatherstation.service';
import { WeatherStation } from '../../models/weatherstation/weatherstation';
import { Marker } from './marker';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'weatherstationMap-map',
  styleUrls: ['weatherstationMap.css'],
  templateUrl: 'weatherstationMap.html',
  providers: [WeatherStationService]
})

export class WeatherStationMapComponent  implements OnInit {
  weatherstations: WeatherStation[];
  markers: Marker[];
  lat = 43.769562;
  lng = 11.255814;
  componentDisplay = false;

  constructor(private weatherStationService: WeatherStationService) {
    this.weatherstations = [];
    this.markers = [];
  }

  ngOnInit() {
    this.weatherStationService.getAllWeathrStation()
      .subscribe((response: WeatherStation[]) => {
        this.weatherstations = response;
      });
    this.addMarker();
    this.componentDisplay = true;
  }

  addMarker() {
    for(const wt of this.weatherstations){
      this.markers.push({
        lat: Number(wt.latitude),
        lng: Number(wt.longitude),
        label: wt.description,
        draggable: false
      });
    }

  }

}
