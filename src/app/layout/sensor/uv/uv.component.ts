import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Sensor } from '../../../models/sensor/sensor';
import { Measure } from '../../../models/measure/measure';
import { MeasureService } from '../../../services/measure/measure.service';

@Component({
  selector: 'uv-card',
  templateUrl: './uv.html',
  styleUrls: ['./uv.css'],
  providers: [ MeasureService ]
})
export class UvCardComponent implements OnInit, OnChanges {
  @Input() sensors: Sensor[];

  measureUv: Measure;
//  measureLux: Measure;

  constructor(private measureService: MeasureService) {
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
          this.measureUv = <Measure> result;
      });
/*    this.measureService.getLastMeasure(this.sensors[1].id)
      .subscribe((result: any) => {
          this.measureUv = <Measure> result;
      });*/
  }

  public getUvColor(){
      if(this.measureUv == null){
        return 'rgb(40,149,0,.5)';
      }

      let value = Number(this.measureUv.quantity);
      if(value <= 2.9){
        return 'rgb(40,149,0,.5)';
      }else if(value > 2.9 && value <= 5.9){
        return 'rgb(247,228,0,.5)';
      }else if(value > 5.9 && value <= 7.9){
        return 'rgb(248,89,0,.5)';
      }else if(value > 7.9 && value <= 10.9){
        return 'rgb(216,0,29,.5)';
      }else if(value > 10.9){
        return 'rgb(107,73,200,.5)';
      }
  }

  public getMeasureValue(measure: Measure) {
    if(measure == null){
      return 'NaN';
    }

    return Math.round(Number(measure.quantity));
  }

  public getUvRange(){
    if(this.measureUv == null){
      return '0';
    }

    let value = Number(this.measureUv.quantity);

    let num = value;
    return (((num / 11) * 100)) + '';
  }

  ngOnChanges(changes: SimpleChanges) {

  }
}
