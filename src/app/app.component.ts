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

  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
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
