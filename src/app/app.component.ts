import { Component, OnInit } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Environment } from './local/environment';
import { AuthenticationService } from './services/authentication/authentication.service';
import { User } from './models/user/user';
//import { Environment } from './local/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AuthenticationService ]
})
export class AppComponent  implements OnInit {
  user: User;
  constructor(private authenticationService: AuthenticationService) {
    //this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    //authenticationService.getMessage().subscribe((user: User) => { this.user = user; console.log(user); });
    authenticationService.currentUserSubject.subscribe(currentUser => {
      this.user = currentUser;
      console.log(this.user);
    });
  }

  ngOnInit() {

  }

  public getTitle(){
    return Environment.TITLE;
  }

  public getVersion(){
    return Environment.VERSION;
  }

  public isLogIn(){
    return this.user != null;
  }

  public logout(){
    this.user = null;
    this.authenticationService.logout();
    location.reload(true);
  }
}
