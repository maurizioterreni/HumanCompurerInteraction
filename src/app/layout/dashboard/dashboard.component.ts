import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Environment } from '../../local/environment';
import { WeatherStationService } from '../../services/weatherstation/weatherstation.service';
import { WeatherStation } from '../../models/weatherstation/weatherstation';
import { DialogMaps } from '../../dialogs/map/dialogMap.component';


/**
 * @title Multi-row toolbar
 */
@Component({
  selector: 'dashboard-app',
  templateUrl: 'dashboard.html',
  styleUrls: ['dashboard.css'],
  providers: [WeatherStationService]
})


export class DashboardComponent implements OnInit {
  private environment: Environment;
  weatherstations: WeatherStation[];
  checked = false;

  constructor(private weatherStationService: WeatherStationService, public dialog: MatDialog){
    this.environment = new Environment();
    this.weatherstations = [];
  }

  ngOnInit() {
    this.weatherStationService.getAllWeathrStation()
      .subscribe((response: WeatherStation[]) => {
          this.weatherstations = response;
      });
    //this.weatherstations = this.weatherStationService.getAllWeathrStation();
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
