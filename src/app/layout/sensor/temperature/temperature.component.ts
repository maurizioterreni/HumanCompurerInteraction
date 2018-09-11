import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Sensor } from '../../../models/sensor/sensor';

@Component({
  selector: 'temperature-card',
  templateUrl: './temperature.html',
  styleUrls: ['./temperature.css'],
  providers: []
})
export class TemperatureCardComponent implements OnInit, OnChanges {
  @Input() sensor: Sensor;

  constructor() {

  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {

  }
}
