import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Environment } from '../../local/environment';
import { WeatherStationService } from '../../services/weatherstation/weatherstation.service';
import { WeatherStation } from '../../models/weatherstation/weatherstation';
import { DialogMaps } from '../../dialogs/map/dialogMap.component';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AlertService } from 'ngx-alerts';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user/user';

/**
 * @title Multi-row toolbar
 */
@Component({
  selector: 'dashboard-app',
  templateUrl: 'dashboard.html',
  styleUrls: ['dashboard.css'],
  providers: [ AlertService,UserService, WeatherStationService ]
})


export class DashboardComponent implements OnInit {
  weatherstations: WeatherStation[];
  checked = false;
  user: User;
  subscription: Subscription;

  constructor(private alertService: AlertService,
    private weatherStationService: WeatherStationService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    public dialog: MatDialog){
    this.weatherstations = [];
    this.user = this.authenticationService.getCurrentUser();
    this.subscription = this.authenticationService.getMessage().subscribe(message => {
      //console.log(message);

      if(message){
        this.user = message.user;
      }

    });

    this.weatherStationService.getAllWeathrStation()
      .subscribe((response: WeatherStation[]) => {
          this.weatherstations = response;
      },
      error => {
          if (error.status == 404){
            this.alertService.danger('Page not found');
          }else if(error.status == 0){
            this.alertService.danger('Can\'t connect to server');
          }
      });
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

  ngOnInit() {

  }

  isLiked(weatherId){
    if(this.user == null){
      return false;
    }
    for(const i of this.user.weatherLikes){
      if(i == weatherId){
        return true;
      }
    }
    return false;
  }

  openMap(longitude: string, latitude: string) {
       this.dialog.open(DialogMaps, {
        data: {
          lat: latitude,
          lng: longitude
        }
      });
  }

  weatherLike(weatherId, isLiked:boolean){

    if(!isLiked){
       this.userService.addWeatherLikes(this.user.token, weatherId)
         .subscribe(
             res => {
               this.user = <User> res;

               this.authenticationService.setCurrentUser(this.user);

            },
              err => {
                console.log(err);
              });
     }else{
       this.userService.removeWeatherLikes(this.user.token, weatherId)
         .subscribe(
             res => {
               this.user = <User> res;

               this.authenticationService.setCurrentUser(this.user);
            },
              err => {
                console.log(err);
          });
     }
  }


}
