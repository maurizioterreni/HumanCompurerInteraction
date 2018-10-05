import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user/user';

@Component({
  selector: 'personal-card',
  templateUrl: './personal.html',
  styleUrls: ['./personal.css'],
  providers: [  ]
})
export class PersonalComponent implements OnInit {

  user: User;
  buttonEnable = false;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));

    if(this.user == null){
      console.log('null');
       this.router.navigate(['/dashboard']);
    }
  }

  canSave(event){
    this.buttonEnable = true;
  }

}
