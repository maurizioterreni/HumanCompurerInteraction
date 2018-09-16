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
  templates: number[];
  id: String;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private sensorService: SensorService){
    this.sensors = [];
    this.templates = [];
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
              let sensor = <Sensor> i;
              if(this.templates.indexOf(sensor.sensorTemplate) == -1) {
                this.templates.push(sensor.sensorTemplate);
              }

              this.sensors.push(<Sensor> i);
            }
          }

          console.log(this.templates);
      });
  }

  public getSensors(templateId) {
    let sensorArray = [];
    for (const i of this.sensors) {
      if(i.sensorTemplate == templateId){
        sensorArray.push(i);
      }
    }

    return sensorArray;
  }

}
