import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user/user';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'personal-card',
  templateUrl: './personal.html',
  styleUrls: ['./personal.css'],
  providers: [  ]
})
export class PersonalComponent implements OnInit {
  subscription: Subscription;
  user: User;
  buttonEnable = false;

  constructor(private router: Router,
    private authenticationService: AuthenticationService) {
      this.subscription = this.authenticationService.getMessage().subscribe(message => {
        //console.log(message);
        if(message){
          this.user = message.user;
        }else{
          this.router.navigate(['/dashboard']);
        }

      });
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));

    if(this.user == null){
       this.router.navigate(['/dashboard']);
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  canSave(event){
    this.buttonEnable = true;
  }

}
