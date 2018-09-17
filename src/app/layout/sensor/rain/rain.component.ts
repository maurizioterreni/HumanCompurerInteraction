import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Sensor } from '../../../models/sensor/sensor';

@Component({
  selector: 'rain-card',
  templateUrl: './rain.html',
  styleUrls: ['./rain.css'],
  providers: []
})
export class RainCardComponent implements OnInit, OnChanges {
  @Input() sensors: Sensor[];

  constructor() {

  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {

  }
}
