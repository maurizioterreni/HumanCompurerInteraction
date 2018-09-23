import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Sensor } from '../../../models/sensor/sensor';
import { Measure } from '../../../models/measure/measure';
import { MeasureService } from '../../../services/measure/measure.service';

@Component({
  selector: 'pressure-card',
  templateUrl: './pressure.html',
  styleUrls: ['./pressure.css'],
  providers: [ MeasureService ]
})
export class PressureCardComponent implements OnInit, OnChanges {
  @Input() sensors: Sensor[];
  measurePressure: Measure;
  measureAlmanac: Measure[];

  constructor(private measureService: MeasureService) {
    this.measureAlmanac = [];
    setInterval(() => {
        this.getCurrentData();
     }, 900000);//15 minuti
  }

  ngOnInit() {
    this.getCurrentData();
  }

  public getCurrentData(){
    this.measureService.getLastMeasure(this.sensors[0].id)
      .subscribe((result: any) => {
          this.measurePressure = <Measure> result;
      });
    this.measureService.getValueOfDay(this.sensors[0].id)
      .subscribe((results: any[]) => {
          for (const i of results) {
            if(i != null){
              let measure = <Measure> i;
              this.measureAlmanac.push(measure);
            }
          }
      });
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  public getMeasureValue(measure: Measure){
    if(measure == null){
      return "NaN";
    }

    let qt = Number(measure.quantity);
    qt = Math.round(qt);

    return qt + ' ' + measure.symbol;
  }

  public getRotation() : string{
    if(this.measurePressure == null){
      return "-45";
    }

    let value = Number(this.measurePressure.quantity);
    let num = value - 950;
    return (((num / 100) * 180) - 45) + '';
  }
}
