import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user/user';
import { Sensor } from '../../models/sensor/sensor';
import { WeatherStation } from '../../models/weatherstation/weatherstation';
import { WeatherStationService } from '../../services/weatherstation/weatherstation.service';
import { SensorService } from '../../services/sensor/sensor.service';
import { DialogCreateWeatherStation } from '../../dialogs/createWeatherStation/dialog-createWeatherStation.component';
import { DialogCreateSensorComponent } from '../../dialogs/createSensor/dialog-createSensor.component';
import { DialogMaps } from '../../dialogs/map/dialogMap.component';
import { AlertService } from 'ngx-alerts';
import { AuthenticationService } from '../../services/authentication/authentication.service';


@Component({
  selector: 'myWeatherStation-card',
  templateUrl: './myWeatherStation.html',
  styleUrls: ['./myWeatherStation.css'],
  providers: [ AlertService, WeatherStationService, SensorService ]
})
export class MyWeatherStationComponent implements OnInit {

  user: User;
  weatherstation: WeatherStation;
  buttonEnable = false;
  sensors: Sensor[];
  subscription: Subscription;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private sensorService: SensorService,
    private authenticationService: AuthenticationService,
    private weatherStationService: WeatherStationService,
    private alertService: AlertService) {

    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    if(this.user == null){
       this.router.navigate(['/dashboard']);
    }else if(this.user.weatherId != null){
      this.sensorService.getSensor(this.user.weatherId)
        .subscribe((results: any[]) => {
            this.sensors = results;
      });
      this.weatherStationService.getWeathrStation(this.user.weatherId)
        .subscribe((response: WeatherStation) => {
            this.weatherstation = <WeatherStation> response;
        },
        error => {
            if (error.status == 404){
              this.alertService.danger('Page not found');
            }else if(error.status == 0){
              this.alertService.danger('Can\'t connect to server');
            }
        });
    }else{
      this.sensors = [];
      this.alertService.info('Create your weatehr station!');
    }

    this.subscription = this.authenticationService.getMessage().subscribe(message => {
      //console.log(message);
      if(message){
        this.user = message.user;
      }else{
        this.router.navigate(['/dashboard']);
      }

    });
  }

  deleteSensor(sensorId){
    this.sensorService.deleteSensor(sensorId, this.user.token)
      .subscribe();
  }


    ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
    }


  canSave(event){
    this.buttonEnable = true;
  }


  ngOnInit() {

  }

  openCreateSensorForm(){
    let dialogCreateSensor = this.dialog.open(DialogCreateSensorComponent, {
     data: {
       user: this.user
     }
    });

    dialogCreateSensor.afterClosed().subscribe(result => {
        if(result.type == 401){
          this.alertService.danger('Unauthorized!');
        }else if(result.type == 500 || result.type == 0){
          this.alertService.danger('Can\'t create sensor!');
        }else if(result.type == 200){
          this.sensors.push(result.sensor);
          this.alertService.success('Created sensor');
        }else if(result.type < 0){
          this.alertService.info('Creation sensor abort!');
        }
    });
  }

  openCreateForm() {
    let dialogRef = this.dialog.open(DialogCreateWeatherStation, {
     data: {
       user: this.user
     }
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result.type == 401){
          console.log('Unauthorized');
          this.alertService.danger('Unauthorized!');
        }else if(result.type == 500 || result.type == 0){
          this.alertService.danger('Can\'t create weather station!');
        }else if(result.type == 200){
          this.weatherstation = result.weatherstation;
          this.user.weatherId = String(this.weatherstation.id);
          sessionStorage.setItem('currentUser', JSON.stringify(this.user));
          this.alertService.success('Created weather station');
        }else if(result.type < 0){
          this.alertService.info('Creation Weather station abort!');
        }
    });
  }

}
