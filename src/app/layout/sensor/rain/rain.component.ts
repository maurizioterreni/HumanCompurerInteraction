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

  constructor(private measureService: MeasureService) {

    this.rainValue = 0;
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

  }

  getRainRange(){
    if(this.rainValue == null){
      return '0';
    }

    let num = this.rainValue;
    return (((num / 11) * 100)) + '';
  }

  ngOnChanges(changes: SimpleChanges) {

  }
}
