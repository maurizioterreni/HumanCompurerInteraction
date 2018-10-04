import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { WeatherStationService } from '../../services/weatherstation/weatherstation.service';
import { User } from '../../models/user/user';
import { WeatherStation } from '../../models/weatherstation/weatherstation';

@Component({
  selector: 'app-dialog-createWeatherStation',
  styleUrls: ['dialog-createWeatherStation.css'],
  templateUrl: 'dialog-createWeatherStation.html',
  providers: [ WeatherStationService ]
})
export class DialogCreateWeatherStation implements OnInit {
  private user : User;
  zoom: number = 15;

  // initial center position for the map
  lat: number = 43.71893;
  lng: number = 10.95459;
  titleName = '';
  urlImage = '';
  you = 'You';
  constructor(private weatherStationService: WeatherStationService,
    public dialogRef: MatDialogRef<DialogCreateWeatherStation>, @Inject(MAT_DIALOG_DATA) public data: any) {
      this.user = data['user'];
  }

  ngOnInit() {
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
          });
        } else {
          this.lat = 43.71893;
          this.lng = 10.95459;
    }
  }


    addTitle(title:string){
      this.titleName = title;
    }

    addUrl(url:string){
      this.urlImage = url;
    }

    clickedMarker() {
      console.log('clicked the marker' );
    }

    mapClicked($event: MouseEvent) {
    }

    markerDragEnd($event) {
      this.lat = $event.coords.lat;
      this.lng = $event.coords.lng;
    }

    close(){
      this.dialogRef.close();
    }

    createSensor(e){
      this.weatherStationService.createWeathrStation(this.user, this.titleName, this.urlImage, ''+this.lat, ''+this.lng)
        .subscribe(
          res => {
            let wt = <WeatherStation> res;
            this.dialogRef.close({type: '200', weatherstation: wt});
          },
          err => {
            this.dialogRef.close({type: err.status});
        });
    }
}
