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
  providers: [ ]
})
export class AppComponent  implements OnInit {
  user: User;
  subscription: Subscription;
  constructor(private authenticationService: AuthenticationService) {
    //this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    //authenticationService.getMessage().subscribe((user: User) => { this.user = user; console.log(user); });
    /*authenticationService.currentUserSubject.subscribe(currentUser => {
      this.user = currentUser;
      console.log(this.user);
    });*/
    this.subscription = this.authenticationService.getMessage().subscribe(message => {
      //console.log(message);
      if(message){
        this.user = message.user;
      }

    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  public getTitle(){
    return Environment.TITLE;
  }

  public getVersion(){
    return Environment.VERSION;
  }

  public isLogIn(){
    if(this.user){
      return true;
    }
    if(this.authenticationService.getCurrentUser()){
      this.user = this.authenticationService.getCurrentUser();
      return true;
    }
    return false;
  }

  public logout(){
    this.user = null;
    this.authenticationService.logout();
    //location.reload(true);
  }
}
