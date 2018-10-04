import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Environment } from '../../local/environment';
import { WeatherStationService } from '../../services/weatherstation/weatherstation.service';
import { WeatherStation } from '../../models/weatherstation/weatherstation';
import { DialogMaps } from '../../dialogs/map/dialogMap.component';
import { Observable, Subject, BehaviorSubject  } from 'rxjs';
import { AlertService } from 'ngx-alerts';



/**
 * @title Multi-row toolbar
 */
@Component({
  selector: 'dashboard-app',
  templateUrl: 'dashboard.html',
  styleUrls: ['dashboard.css'],
  providers: [ AlertService, WeatherStationService ]
})


export class DashboardComponent implements OnInit {
  weatherstations: WeatherStation[];
  checked = false;

  constructor(private alertService: AlertService, private weatherStationService: WeatherStationService, public dialog: MatDialog){
    this.weatherstations = [];
  }

  ngOnInit() {
    this.weatherStationService.getAllWeathrStation()
      .subscribe((response: WeatherStation[]) => {
          this.weatherstations = response;
      },
      error => {
          if (error.status == 404){
            this.alertService.danger('Page not found');
          }else if(error.status == 0){
            this.alertService.danger('Can\'t connect to server');
          }
      });
  }

  isLiked(weatherId){
    return false;
  }

  openMap(longitude: string, latitude: string) {
       this.dialog.open(DialogMaps, {
        data: {
          lat: latitude,
          lng: longitude
        }
      });
  }


}
