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
  sunset : any;
  sunrise : any;
  constructor() {
    //this.d = new Date(date);
  //  this.sunrise = new Date(this.now.getFullYear() + '', this.now.getMonth() + '', this.now.getDay() + '', '6', '50');
  //  this.sunset = new Date(this.now.getFullYear() + '', this.now.getMonth() + '', this.now.getDay() + '', '19', '10');
    this.sunrise = new Date(this.now);
    this.sunset = new Date(this.now);

  //  this.sunrise.setHours(6,50,0,0);
//    this.sunset.setHours(19,10,0,0);

    this.calculateSunrise();

  //  console.log(this.sunrise.getFullYear() + '  ' + (this.sunrise.getMonth() + 1));

    setInterval(() => {
        this.now =  Date.now();
     }, 10000);

  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {

  }

  private calculateSunrise(){

    let zenith = 0;//Math.cos(zenith)
    let latitude = 10.951802242615486;
    let n1 = Math.floor(275 * (this.sunrise.getMonth() + 1) / 9);
    let n2 = Math.floor((this.sunrise.getMonth() + 10) /12 );
    let n3 = (1 + Math.floor((this.sunrise.getFullYear() - 4 * Math.floor(this.sunrise.getFullYear() / 4) + 2) / 3));
    let n = n1 - (n2 * n3) + this.sunrise.getDate() - 30;

    console.log('n = ' + n);

    let lngHour = latitude / 15;
    console.log('lngHour = ' + lngHour);
    let t = n + ((6 - lngHour) / 24);
    console.log('t = ' + t);
    let m = (0.9856 * t) - 3.289;
    console.log('m = ' + m);

    let l = m + (1.916 * Math.sin(m)) + (0.020 * Math.sin(2 * m)) + 282.634;
    console.log('l = ' + l);
    let ra = Math.atan(0.91764 * Math.tan(l));
    console.log('ra = ' + ra);

    let lQuadrant = Math.floor(l/90) * 90;
    console.log('lQuadrant = ' + lQuadrant);
    let raQuadrant = Math.floor(ra / 90) * 90;
    console.log('raQuadrant = ' + raQuadrant);
    ra = ra + (lQuadrant - raQuadrant);
    console.log('ra = ' + ra);

    ra = ra / 15;
    console.log('ra = ' + ra);
    let sinDec = 0.39782 * Math.sin(l);
    console.log('sinDec = ' + sinDec);
    let cosDec = Math.cos(Math.asin(sinDec));
    console.log('cosDec = ' + cosDec);
    let cosH = -0.079363;//(zenith - (sinDec * Math.sin(latitude))) / (cosDec * Math.cos(latitude));
  
    if(cosH > 1){
      console.log('the sun never rises on this location');
      return;
    }
    if(cosH < -1){
      console.log('the sun never sets on this location');
      return;
    }

    let h = 360 - Math.acos(cosH);

    h = h / 15;

    t = h + ra - (0.06571 * t) - 6.662;



    console.log(t);
  //  this.sunrise.setHours(6,50,0,0);
  }

/*
  getRotation(value) : string{
    let num = value - 958;
    return (((num / 100) * 180) - 45) + '';
  }*/

  public getRotation() : string{
    var num = this.now - this.sunrise;
    num = (((num / (this.sunset - this.sunrise)) * 172) - 49);

    if(num > 123){
      num = 123;
    }

    if(num < -49){
      num = -49;
    }

    return String(num);
  }


}
