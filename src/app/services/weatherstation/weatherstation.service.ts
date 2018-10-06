import { WeatherStation } from '../../models/weatherstation/weatherstation';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ServiceConfig } from '../serviceConfig';
import { User } from '../../models/user/user';
//import 'rxjs/add/operator/catch';


@Injectable()
export class WeatherStationService {
  serviceConf : ServiceConfig;
  constructor(private http: HttpClient) {
    this.serviceConf = new ServiceConfig();
  }

  getAllWeathrStation() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this.http.get(this.serviceConf.getEndPoint() + 'weatherstation' , {headers});

   }

   getWeathrStation(weatherId) {
     const headers = new HttpHeaders()
       .set('Content-Type', 'application/json');

     return this.http.get(this.serviceConf.getEndPoint() + 'weatherstation/' + weatherId , {headers});

    }

   createWeathrStation(user:User, titleName:string, urlImage:string, lat: string, lng:string) {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('token', '' + user.token);

      return this.http.post(this.serviceConf.getEndPoint() + 'weatherstation' ,
        JSON.stringify({ longitude: lng, latitude: lat , description: titleName, image: urlImage}), {headers});
   }
}
