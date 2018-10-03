import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { User } from '../../models/user/user';
import { DialogCreateWeatherStation } from '../../dialogs/createWeatherStation/dialogCreateWeatherStation.component';
import { DialogMaps } from '../../dialogs/map/dialogMap.component';


@Component({
  selector: 'myWeatherStation-card',
  templateUrl: './myWeatherStation.html',
  styleUrls: ['./myWeatherStation.css'],
  providers: [  ]
})
export class MyWeatherStationComponent implements OnInit {

  user: User;

  constructor(private router: Router, public dialog: MatDialog) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user == null){
       this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {

  }

  openCreateForm() {
    this.dialog.open(DialogCreateWeatherStation);
  }

}
