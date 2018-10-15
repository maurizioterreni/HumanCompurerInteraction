import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Sensor } from '../../../models/sensor/sensor';
import { Measure } from '../../../models/measure/measure';
import { MeasureService } from '../../../services/measure/measure.service';

@Component({
  selector: 'rain-card',
  templateUrl: './rain.html',
  styleUrls: ['./rain.css'],
  providers: [ MeasureService ]
})
export class RainCardComponent implements OnInit, OnChanges {
  @Input() sensors: Sensor[];
  rainValue: number;
  measureRainYear: number;
  measureRainMonth: number;
  measureRainDay: number;
  today = Date.now();

  constructor(private measureService: MeasureService) {

    this.rainValue = 0;
    this.measureRainYear = 0;
    this.measureRainMonth = 0;
    this.measureRainDay = 0;
  }

  ngOnInit() {
    this.measureService.getValueOfDay(this.sensors[0].id)
      .subscribe((results: any[]) => {
          for (const i of results) {
            if(i != null){
              let measure = <Measure> i;
              this.rainValue = this.rainValue + Number(measure.quantity);
            }
          }
      });


      var fromDate = new Date();
      fromDate.setDate(fromDate.getDate()-1);
      fromDate.setHours(0,0,0,0);

      var toDate = new Date();
      toDate.setDate(toDate.getDate()-1);
      toDate.setHours(23,59,59,59);

      this.measureService.getMeasureByDate(this.sensors[0].id, fromDate.getTime(), toDate.getTime())
        .subscribe((results : any[]) => {
          for (const i of results) {
            let measure = <Measure> i;
            this.measureRainDay = this.measureRainDay + Number(measure.quantity);
          }

      });

      this.measureService.getValueOfMonth(this.sensors[0].id)
        .subscribe((results: any[]) => {
            for (const i of results) {
              if(i != null){
                let measure = <Measure> i;
                this.measureRainMonth = this.measureRainMonth + Number(measure.quantity);
              }
            }
        });


      this.measureService.getValueOfYear(this.sensors[0].id)
        .subscribe((results: any[]) => {
            for (const i of results) {
              if(i != null){
                let measure = <Measure> i;
                this.measureRainYear = this.measureRainYear + Number(measure.quantity);
              }
            }
        });




  }

  getRainRange(){
    if(this.rainValue == null){
      return '0';
    }

    let num = this.rainValue;
    return (((num / 6) * 100)) + '';
  }

  ngOnChanges(changes: SimpleChanges) {

  }
}
