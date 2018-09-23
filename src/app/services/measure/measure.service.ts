import { WeatherStation } from '../../models/weatherstation/weatherstation';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ServiceConfig } from '../serviceConfig';
//import 'rxjs/add/operator/catch';


@Injectable()
export class MeasureService {
  private serviceConf : ServiceConfig;
  constructor(private http: HttpClient) {
    this.serviceConf = new ServiceConfig();
  }

  getLastMeasure(sensorId) {
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

    return this.http.get(this.serviceConf.getEndPoint() + 'measure/sensor/' + sensorId + '/last', {headers});
  }

  getValueOfDay(sensorId) {
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

    return this.http.get(this.serviceConf.getEndPoint() + 'measure/sensor/' + sensorId + '/getValueOfDay', {headers});
  }

  getValueOfMonth(sensorId) {
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

    return this.http.get(this.serviceConf.getEndPoint() + 'measure/sensor/' + sensorId + '/getValueOfMonth', {headers});
  }

  getValueOfYear(sensorId) {
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

    return this.http.get(this.serviceConf.getEndPoint() + 'measure/sensor/' + sensorId + '/getValueOfYear', {headers});
  }

  getMeasure(sensorId) {
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

    return this.http.get(this.serviceConf.getEndPoint() + 'measure/sensor/' + sensorId + '/getMeasure', {headers});
  }
}
