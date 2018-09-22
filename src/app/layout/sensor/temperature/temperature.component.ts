import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Sensor } from '../../../models/sensor/sensor';
import { Measure } from '../../../models/measure/measure';
import { MeasureService } from '../../../services/measure/measure.service';

@Component({
  selector: 'temperature-card',
  templateUrl: './temperature.html',
  styleUrls: ['./temperature.css'],
  providers: [ MeasureService ]
})
export class TemperatureCardComponent implements OnInit, OnChanges {
  @Input() sensors: Sensor[];
  measureTemp: Measure;
  measureHum: Measure;

  almanacTemp : Measure[];
  almanacHum : Measure[];

  constructor(private measureService: MeasureService) {
    this.almanacTemp = [];
    this.almanacHum = [];
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
          this.measureTemp = <Measure> result;
      });
    this.measureService.getLastMeasure(this.sensors[1].id)
      .subscribe((result: any) => {
          this.measureHum = <Measure> result;
      });

    this.measureService.getValueOfDay(this.sensors[0].id)
      .subscribe((results: any[]) => {
          for (const i of results) {
            if(i != null){
              let measure = <Measure> i;
              this.almanacTemp.push(measure);
            }
          }
      });
    this.measureService.getValueOfDay(this.sensors[1].id)
      .subscribe((results: any[]) => {
          for (const i of results) {
            if(i != null){
              let measure = <Measure> i;
              this.almanacHum.push(measure);
            }
          }
      });
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  public calcDewPoint() : number{
    let Dp = 999;
    if(this.measureTemp != null && this.measureHum != null){
      let temp = Number(this.measureTemp.quantity);
      let hum = Number(this.measureHum.quantity);
      let exp = (7.5 * temp) / (237.7 + temp);
      let Es = 6.11 * (Math.pow(10, exp));
      let E = (hum * Es) / 100;
      Dp = Math.round((-430.22 + 237.7 * Math.log(E)) / (-Math.log(E) + 19.08) * 10) / 10;
    }
    return Dp;
  }
}
