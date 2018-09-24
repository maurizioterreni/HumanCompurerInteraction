import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Sensor } from '../../../models/sensor/sensor';

@Component({
  selector: 'uv-card',
  templateUrl: './uv.html',
  styleUrls: ['./uv.css'],
  providers: []
})
export class UvCardComponent implements OnInit, OnChanges {
  @Input() sensors: Sensor[];

  constructor() {

  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {

  }
}
