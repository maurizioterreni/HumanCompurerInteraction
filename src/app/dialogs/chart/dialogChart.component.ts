import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatTabChangeEvent } from '@angular/material';
import { Sensor } from '../../models/sensor/sensor';
import { Measure } from '../../models/measure/measure';
import { MeasureService } from '../../services/measure/measure.service';
import { Chart } from 'chart.js';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

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
  fromDate: Date;
  toDate: Date;
  buttonEnable = false;
  chart = []; // This will hold our chart info
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private measureService: MeasureService) {
    this.sensors = data['sensors'];
    this.quantityArray = [];
    this.dateArray = [];
  }

  ngOnInit() {
    this.loadDataChart();

  }


  dateSelected(){
    this.measureService.getMeasureByDate(this.sensors[this.sensorIndex].id, this.fromDate.getTime(), this.toDate.getTime())
      .subscribe((results : any[]) => {
        this.quantityArray = [];
        this.dateArray = [];
        for (const i of results) {
          let m = <Measure> i;
        //  console.log(m);
          let jsdate = new Date(m.dateTime);
          this.quantityArray.push( m.quantity);
          this.dateArray.push(m.dateTime);
          //jsdate.toLocaleTimeString('it', { hour: 'numeric', minute: 'numeric'})
        }
        this.drawChart();
    });
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if(type == 'fromDate'){
      this.fromDate = new Date(event.value);
      this.buttonEnable = true;
    }else{
      this.toDate = new Date(event.value);
    }
  //  console.log(this.fromDate);
//    console.log(this.toDate.getTime());
  }


  public loadDataChart(){
    this.measureService.getMeasure(this.sensors[this.sensorIndex].id)
      .subscribe((results : any[]) => {
        this.quantityArray = [];
        this.dateArray = [];
        for (const i of results) {
          let m = <Measure> i;
          let jsdate = new Date(m.dateTime);
          this.quantityArray.push( m.quantity);
          this.dateArray.push(jsdate);
          //jsdate.toLocaleTimeString('it', { hour: 'numeric', minute: 'numeric'})
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
            display: true,
            type: 'time',
            distribution: 'linear',
            ticks: {
              autoSkip:true,
              maxTicksLimit:10,
              source: 'auto'
            },
            time: {
              displayFormats: {
                quarter: 'minute'
              }
            }
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }


  public changeChart(event: MatTabChangeEvent) {
    this.sensorIndex = event.index;
    this.loadDataChart();
  }

}
