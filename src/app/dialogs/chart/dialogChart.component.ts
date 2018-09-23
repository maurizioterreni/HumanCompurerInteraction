import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Sensor } from '../../models/sensor/sensor';
import { Measure } from '../../models/measure/measure';
import { MeasureService } from '../../services/measure/measure.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dialog-chart',
  styleUrls: ['dialog-chart.css'],
  templateUrl: 'dialog-chart.html',
  providers: [ MeasureService ]
})
export class DialogChart implements OnInit  {
  sensors: Sensor[];
  quantityArray: any[];
  dateArray: any[];
  sensorIndex = 0;
  chart = []; // This will hold our chart info
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private measureService: MeasureService) {
    this.sensors = data['sensors'];
    this.quantityArray = [];
    this.dateArray = [];
    console.log(this.sensors);
  }

  ngOnInit() {
    this.measureService.getMeasure(this.sensors[this.sensorIndex].id)
      .subscribe((results : any[]) => {
        for (const i of results) {
          let m = <Measure> i;
          this.quantityArray.push( m.quantity);
          this.dateArray.push(m.dateTime);
        }
        this.drawChart();
    });
  }

  private drawChart(){
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.dateArray,
        datasets: [
          {
            data: this.quantityArray,
            borderColor: "#3cba9f",
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

}
