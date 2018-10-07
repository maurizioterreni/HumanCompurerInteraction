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
    private subject = new Subject<any>();

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
                  //  this.currentUserSubject.next(user);
                    this.subject.next({ user: user });
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    get currentUser() {
      return JSON.parse(sessionStorage.getItem('currentUser'));
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    register(username: string, password: string, email: string) {
        return this.http.post<any>(this.serviceConf.getEndPoint() + 'registration', { username: username, password: password, email: email })
            .pipe(map(user => {
                return user;
            }));
    }

    sendMessage(message: string) {
        this.subject.next({ text: message });
    }


    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
        this.clearMessage();

    }
}
