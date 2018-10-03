/**
 * New typescript file
 */
import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { WeatherStationService } from '../../services/weatherstation/weatherstation.service';
import { User } from '../../models/user/user';



@Component({
  selector: 'app-dialog-createWeatherStation',
  templateUrl: 'dialogCreateWeatherStation.html',
  styleUrls: ['dialogCreateWeatherStation.css'],
  providers: [ WeatherStationService ]
})
export class DialogCreateWeatherStation  implements OnInit {


  constructor(private weatherStationService: WeatherStationService) {
      //this.user = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {

  }

  createWeatherStation(){

  //  console.log(this.titleName + '  ' + this.urlImage);

  /*  this.weatherStationService.createWeathrStation(this.user, this.titleName, this.urlImage, ''+this.lat, ''+this.lng)
      .subscribe(
        res => {
          console.log(res);
          this.dialogRef.close();
        },
        err => {
          console.log('ERROR');
          //openSnackBar("User or Password wrong", "undo");

      });*/
  }
}
