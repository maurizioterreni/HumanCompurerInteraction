import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user/user';

@Component({
  selector: 'myWeatherStation-card',
  templateUrl: './myWeatherStation.html',
  styleUrls: ['./myWeatherStation.css'],
  providers: [  ]
})
export class MyWeatherStationComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {

  }
}
