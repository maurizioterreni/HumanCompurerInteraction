import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServiceConfig } from '../serviceConfig';

@Injectable()
export class AuthenticationService {
    private serviceConf : ServiceConfig;
    constructor(private http: HttpClient) {
      this.serviceConf = new ServiceConfig();
    }

    login(username: string, password: string) {
        return this.http.post<any>(this.serviceConf.getEndPoint() + '/login', { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
    }
}
