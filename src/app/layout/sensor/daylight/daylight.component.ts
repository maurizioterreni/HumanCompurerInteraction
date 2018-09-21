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

    this.calculateHour(43.69489556632679,10.951802242615486,true);
    this.calculateHour(43.69489556632679,10.951802242615486,false);

  //  console.log(this.sunrise.getFullYear() + '  ' + (this.sunrise.getMonth() + 1));

    setInterval(() => {
        this.now =  Date.now();
     }, 10000);

  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {

  }

  private calculateHour(latitude,longitude, rise){
    let localOffset = 2.0;
    let n1 = Math.floor(275 * (this.sunrise.getMonth() + 1) / 9);
    let n2 = Math.floor((this.sunrise.getMonth() + 10) /12 );
    let n3 = (1 + Math.floor((this.sunrise.getFullYear() - 4 * Math.floor(this.sunrise.getFullYear() / 4) + 2) / 3));
    let N = n1 - (n2 * n3) + this.sunrise.getDate() - 30;


    //2. convert the longitude to hour value and calculate an approximate time
    let lngHour = longitude / 15;
    //let t = rise?
    let t = 0;
    if(rise){
      t = N + (( 6 - lngHour) / 24);
    }else{
      t = N + ((18 - lngHour) / 24)
    }
    //3. calculate the Sun's mean anomaly
    let M = (0.9856 * t) - 3.289;
    //4. calculate the Sun's true longitude
    let L = M + (1.916 * this.sin(M)) + (0.020 * this.sin(2 * M)) + 282.634;
    L = this.mod(L, 360);

    //5a. calculate the Sun's right ascension
    let RA = this.atan(0.91764 * this.tan(L));
    RA = this.mod(RA, 360);

    //5b. right ascension value needs to be in the same quadrant as L
    let Lquadrant  = (Math.floor( L/90)) * 90;
    let RAquadrant = (Math.floor(RA/90)) * 90;
    RA = RA + (Lquadrant - RAquadrant);

    //5c. right ascension value needs to be converted into hours
    RA = RA / 15;

    //6. calculate the Sun's declination
    let sinDec = 0.39782 * this.sin(L);
    let cosDec = this.cos(this.asin(sinDec));

    //7a. calculate the Sun's local hour angle
    let zenith = 90 + 50.0/60;
    let cosH = (this.cos(zenith) - (sinDec * this.sin(latitude))) / (cosDec * this.cos(latitude));

    if (cosH >  1)
      throw new Error("the sun never rises on this location (on the specified date");
    if (cosH < -1)
      throw new Error("the sun never sets on this location (on the specified date");

    //7b. finish calculating H and convert into hours
    //let H = rise?
    let H = 0;
    if(rise){
      H = 360 - this.acos(cosH);
    }else{
      H = this.acos(cosH);
    }

    H = H / 15;

    //8. calculate local mean time of rising/setting
    let T = H + RA - (0.06571 * t) - 6.622;
          //9. adjust back to UTC
    let UT = T - lngHour;

    //10. convert UT value to local time zone of latitude/longitude
    let localT = UT + localOffset;
    localT = this.mod(localT, 24);

    let hour = Math.floor(localT);
    let minute = Math.floor((localT - hour) * 100);

    if(rise){
      this.sunrise.setHours(hour,minute,0,0);
    }else{
      this.sunset.setHours(hour,minute,0,0);
    }
  }

  private mod(x, lim){
    return x - lim * Math.floor(x/lim);
  }

  private cos(degree){
    return Math.cos(degree*Math.PI/180);
  }

  private sin(degree){
    return Math.sin(degree*Math.PI/180);
  }

  private asin(x){
    return Math.asin(x) *180/Math.PI;
  }

  private tan(degree){
    return Math.tan(degree*Math.PI/180);
  }
  private atan(x){
    return Math.atan(x) *180/Math.PI;
  }

  private acos(x){
    return Math.acos(x) *180/Math.PI;
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
