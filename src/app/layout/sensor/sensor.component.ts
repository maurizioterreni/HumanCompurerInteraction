import { Component, OnInit } from '@angular/core';
import { Environment } from '../../local/environment';
import { Sensor } from '../../models/sensor/sensor';
import { SensorService } from '../../services/sensor/sensor.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

/**
 * @title Multi-row toolbar
 */
@Component({
  selector: 'sensor-app',
  templateUrl: 'sensor.html',
  styleUrls: ['sensor.css'],
  providers: [SensorService]
})


export class SensorComponent implements OnInit {
  private environment: Environment;
  sensors: Sensor[];
  id: String;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private sensorService: SensorService){
    this.sensors = [];
  }

  ngOnInit() {
    this.activeRoute.params.forEach((params: Params) => {
      this.id = params['id'];
    });
    console.log(this.id);
    this.sensorService.getSensor(this.id)
      .subscribe((results: any[]) => {
          for (const i of results) {
            if(i != null){
              this.sensors.push(<Sensor> i);
            }
          }
      });
  }
}
