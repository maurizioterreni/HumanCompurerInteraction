import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Sensor } from '../../../models/sensor/sensor';

@Component({
  selector: 'pressure-card',
  templateUrl: './pressure.html',
  styleUrls: ['./pressure.css'],
  providers: []
})
export class PressureCardComponent implements OnInit, OnChanges {
  @Input() sensors: Sensor[];

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
