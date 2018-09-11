import { WeatherStation } from '../../models/weatherstation/weatherstation';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Sensor } from '../../models/sensor/sensor';
//import 'rxjs/add/operator/catch';


@Injectable()
export class SensorService {
  constructor(private http: HttpClient) { }

  getSensor(weatherId) {
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('weatherId', ''+weatherId);

      return this.http.get('http://maurizioterreni.altervista.org/rest/services/sensor/read.php' , {headers});
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
