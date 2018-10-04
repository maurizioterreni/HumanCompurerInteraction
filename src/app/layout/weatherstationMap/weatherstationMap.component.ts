import { Component, OnInit } from '@angular/core';
import { WeatherStationService } from '../../services/weatherstation/weatherstation.service';
import { WeatherStation } from '../../models/weatherstation/weatherstation';
import { Marker } from './marker';
import { MouseEvent } from '@agm/core';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'weatherstationMap-map',
  styleUrls: ['weatherstationMap.css'],
  templateUrl: 'weatherstationMap.html',
  providers: [ WeatherStationService ]
})

export class WeatherStationMapComponent  implements OnInit {
  weatherstations: WeatherStation[];
  markers: Marker[];
  lat : number;
  lng : number;

  constructor(private alertService: AlertService, private weatherStationService: WeatherStationService) {
    this.weatherstations = [];
    this.markers = [];
  //  this.findMe();
  }

  ngOnInit() {
    this.weatherStationService.getAllWeathrStation()
      .subscribe((response: WeatherStation[]) => {
        this.weatherstations = response;
        this.addMarker();
      });

    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
          });
      } else {
          this.lat = 43.71893;
          this.lng = 10.95459;
          this.alertService.info('Can\'t get geolocation!');
    }
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

/*  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    } else {
      this.lat = 43.769562;
      this.lng = 11.255814;
      alert("Geolocation is not supported by this browser.");
    }
  }*/

}
