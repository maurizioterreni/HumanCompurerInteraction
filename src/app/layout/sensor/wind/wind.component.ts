import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Sensor } from '../../../models/sensor/sensor';

@Component({
  selector: 'wind-card',
  templateUrl: './wind.html',
  styleUrls: ['./wind.css'],
  providers: []
})
export class WindCardComponent implements OnInit, OnChanges {
  @Input() sensor: Sensor;

  constructor() {

  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {

  }

  getRotation(value) : string{
    let num = value - 958;
    return (((num / 100) * 180) - 45) + '';
  }
}
