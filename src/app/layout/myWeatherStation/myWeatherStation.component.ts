import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { User } from '../../models/user/user';
import { DialogCreateWeatherStation } from '../../dialogs/createWeatherStation/dialog-createWeatherStation.component';
import { DialogMaps } from '../../dialogs/map/dialogMap.component';
import { AlertService } from 'ngx-alerts';


@Component({
  selector: 'myWeatherStation-card',
  templateUrl: './myWeatherStation.html',
  styleUrls: ['./myWeatherStation.css'],
  providers: [ AlertService ]
})
export class MyWeatherStationComponent implements OnInit {

  user: User;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private alertService: AlertService) {

    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    if(this.user == null){
       this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {

  }

  openCreateForm() {
    let dialogRef = this.dialog.open(DialogCreateWeatherStation, {
     data: {
       user: this.user
     }
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if(result.type == 401){
          console.log('Unauthorized');
          this.alertService.danger('Unauthorized!');
        }else if(result.type == 500 || result.type == 0){
          this.alertService.danger('Can\'t create weather station!');
        }else if(result.type == 200){
          let wt = result.weatherstation;
          this.user.weatherId = wt.id;
          sessionStorage.setItem('currentUser', JSON.stringify(this.user));
          this.alertService.success('Created weather station');
        }
    });
  }

}
