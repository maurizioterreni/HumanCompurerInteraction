import { WeatherStation } from '../../models/weatherstation/weatherstation';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Sensor } from '../../models/sensor/sensor';
import { ServiceConfig } from '../serviceConfig';
//import 'rxjs/add/operator/catch';


@Injectable()
export class SensorTypeKnowledge {
  private serviceConf : ServiceConfig;
  constructor(private http: HttpClient) {
    this.serviceConf = new ServiceConfig();
  }

  getAllsensorTypeKnowledge() {
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

    return this.http.get(this.serviceConf.getEndPoint() + 'sensorTypeKnowledge/getAll/', {headers});
  }
}
