import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Sensor } from '../../../models/sensor/sensor';

@Component({
  selector: 'daylight-card',
  templateUrl: './daylight.html',
  styleUrls: ['./daylight.css'],
  providers: []
})
export class DaylightCardComponent implements OnInit, OnChanges {
  now = Date.now();
  //sunset : Date;
  //sunrise : Date;
  constructor() {
    //this.d = new Date(date);
  //  this.sunrise = new Date(this.now.getFullYear() + '', this.now.getMonth() + '', this.now.getDay() + '', '6', '50');
  //  this.sunset = new Date(this.now.getFullYear() + '', this.now.getMonth() + '', this.now.getDay() + '', '19', '10');

  //  this.sunrise = new Date('2018','09', '18', '6', '50');
  //  this.sunset = new Date('2018','09', '18', '19', '10');
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {

  }
/*
  getRotation(value) : string{
    let num = value - 958;
    return (((num / 100) * 180) - 45) + '';
  }*/

  public getRotation() : string{
  //  let num = this.now.getTime() + 0;// - this.getMillies(this.sunrise);
//    console.log(num);
    return '100';
  }
}
