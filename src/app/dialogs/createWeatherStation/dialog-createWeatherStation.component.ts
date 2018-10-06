import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WeatherStationService } from '../../services/weatherstation/weatherstation.service';
import { User } from '../../models/user/user';
import { WeatherStation } from '../../models/weatherstation/weatherstation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-createWeatherStation',
  styleUrls: ['dialog-createWeatherStation.css'],
  templateUrl: 'dialog-createWeatherStation.html',
  providers: [ WeatherStationService ]
})
export class DialogCreateWeatherStation implements OnInit {
  private user : User;
  zoom: number = 15;
  createWtForm: FormGroup;

  // initial center position for the map
  lat: number = 43.71893;
  lng: number = 10.95459;
  you = 'You';
  constructor(
    private weatherStationService: WeatherStationService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogCreateWeatherStation>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.user = data['user'];
  }

  get f() { return this.createWtForm.controls; }

  ngOnInit() {
    this.createWtForm = this.formBuilder.group({
        title: ['', Validators.required],
        url: ['', Validators.required]
    });
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
  clickedMarker() {
    //console.log('clicked the marker' );
  }

  mapClicked($event: MouseEvent) {
  }

  markerDragEnd($event) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }

  close(){
    this.dialogRef.close({type: '-1'});
  }

  createSensor(){
    console.log(this.createWtForm);
    // stop here if form is invalid
    if (this.createWtForm.invalid) {
        return;
    }
    this.weatherStationService.createWeathrStation(this.user, this.f.title.value, this.f.url.value, ''+this.lat, ''+this.lng)
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
