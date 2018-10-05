import { Injectable , Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServiceConfig } from '../serviceConfig';
import { User } from '../../models/user/user';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AuthenticationService {
    private serviceConf : ServiceConfig;

    private user:User;


    private userSubject = new Subject<any>;

    constructor(private http: HttpClient) {
      this.serviceConf = new ServiceConfig();
    }

    login(username: string, password: string) {
        return this.http.post<any>(this.serviceConf.getEndPoint() + 'login', { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {

                    //this.getLoggedIn.emit(user);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.userSubject.next(user);
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    setUserObservable(user) {
     this.user = user;

   }
   getMessage(): Observable<any> {
        return this.userSubject.asObservable();
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
        this.userSubject.next();

    }
}
