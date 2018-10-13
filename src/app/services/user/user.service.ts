import { WeatherStation } from '../../models/weatherstation/weatherstation';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ServiceConfig } from '../serviceConfig';
import { User } from '../../models/user/user';
//import 'rxjs/add/operator/catch';


@Injectable()
export class UserService {
  serviceConf : ServiceConfig;
  constructor(private http: HttpClient) {
    this.serviceConf = new ServiceConfig();
  }

  addWeatherLikes(token, weatherId){
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('token', token);


    return this.http.post(this.serviceConf.getEndPoint() + 'user/weatherLike/' + weatherId , {} , {headers});
  }

  removeWeatherLikes(token, weatherId){
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('token', token);

    return this.http.delete(this.serviceConf.getEndPoint() + 'user/weatherLike/' + weatherId  , {headers});
  }
}
