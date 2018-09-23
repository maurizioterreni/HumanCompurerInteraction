import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Sensor } from '../../../models/sensor/sensor';
import { Measure } from '../../../models/measure/measure';
import { MeasureService } from '../../../services/measure/measure.service';

@Component({
  selector: 'wind-card',
  templateUrl: './wind.html',
  styleUrls: ['./wind.css'],
  providers: [ MeasureService ]
})
export class WindCardComponent implements OnInit, OnChanges {
  @Input() sensors: Sensor[];
  measureWind: Measure;
  measureWindYear: Measure[];
  measureWindMonth: Measure[];
  measureWindDay: Measure[];
  measureDirection: Measure;
  today = Date.now();

  constructor(private measureService: MeasureService) {
    this.measureWindYear = [];
    this.measureWindMonth = [];
    this.measureWindDay = [];
    setInterval(() => {
        this.getCurrentData();
     }, 900000);//15 minuti
  }

  ngOnInit() {
    this.getCurrentData();
  }

  private getCurrentData(){
    this.measureService.getLastMeasure(this.sensors[0].id)
      .subscribe((result: any) => {
          this.measureWind = <Measure> result;
      });
    this.measureService.getLastMeasure(this.sensors[1].id)
      .subscribe((result: any) => {
          this.measureDirection = <Measure> result;
      });
    this.measureService.getValueOfDay(this.sensors[0].id)
      .subscribe((results: any[]) => {
          for (const i of results) {
            if(i != null){
              let measure = <Measure> i;
              this.measureWindDay.push(measure);
            }
          }
      });
    this.measureService.getValueOfMonth(this.sensors[0].id)
      .subscribe((results: any[]) => {
          for (const i of results) {
            if(i != null){
              let measure = <Measure> i;
              this.measureWindMonth.push(measure);
            }
          }
      });
    this.measureService.getValueOfYear(this.sensors[0].id)
      .subscribe((results: any[]) => {
          for (const i of results) {
            if(i != null){
              let measure = <Measure> i;
              this.measureWindYear.push(measure);
            }
          }
      });
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  public getDirectionNumber(){
    if(this.measureDirection != null){
      let dir = Number(this.measureDirection.quantity);
      let symb = this.measureDirection.symbol;
      return Math.round(dir) + symb;
    }

    return 'NaN';
  }

  public getDirectionAngle() : string{
    if(this.measureDirection == null){
      return "NaN";
    }
    let angle = Number(this.measureDirection.quantity);
    if(angle >= 0 && angle < 22) return "N";
    else if(angle >= 22 && angle < 45) return "NNE";
    else if(angle >= 45 && angle < 67) return "NE";
    else if(angle >= 67 && angle < 90) return "ENE";
    else if(angle >= 90 && angle < 112) return "E";
    else if(angle >= 112 && angle < 135) return "ESE";
    else if(angle >= 135 && angle < 157) return "SE";
    else if(angle >= 157 && angle < 180) return "SSE";
    else if(angle >= 180 && angle < 202) return "S";
    else if(angle >= 202 && angle < 225) return "SSW";
    else if(angle >= 225 && angle < 247) return "SW";
    else if(angle >= 247 && angle < 270) return "WSW";
    else if(angle >= 270 && angle < 292) return "W";
    else if(angle >= 292 && angle < 315) return "WNW";
    else if(angle >= 315 && angle < 337) return "NW";
    else if(angle >= 337 && angle < 360) return "NNW";
    else return "NaN";
  }

  public getMeasureValue(measure: Measure){
    if(measure == null){
      return "NaN";
    }

    let qt = Number(measure.quantity);
    qt = Math.round(qt * 10) / 10;

    return qt + ' ' + measure.symbol;
  }


  public getRotation() : string{
    if(this.measureDirection == null){
      return "0";
    }
    return this.measureDirection.quantity;
  }
}
