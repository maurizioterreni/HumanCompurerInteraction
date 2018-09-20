import { WeatherStation } from '../../models/weatherstation/weatherstation';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Sensor } from '../../models/sensor/sensor';
import { ServiceConfig } from '../serviceConfig';
//import 'rxjs/add/operator/catch';


@Injectable()
export class SensorService {
  private serviceConf : ServiceConfig;
  constructor(private http: HttpClient) {
    this.serviceConf = new ServiceConfig();
  }

  getSensor(weatherId) {
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
    console.log(this.serviceConf.getEndPoint() + 'sensor/weatherstation/');
    return this.http.get(this.serviceConf.getEndPoint() + 'sensor/weatherstation/' + weatherId, {headers});
  }
/*
   createWeathrStation(user:User, titleName:string, urlImage:string, lat: string, lng:string) {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('token', '' + user.token);

      return this._http.post('http://localhost:8080/WeatherSt-0.0.1-SNAPSHOT/rest/1.0/weatherstation' ,
        JSON.stringify({ longitude: lng, latitude: lat , description: titleName, image: urlImage}), {headers})
        .map((response) => <WeatherStation> response);
   }*/
}
