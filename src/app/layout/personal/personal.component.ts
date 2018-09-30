import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'personal-card',
  templateUrl: './personal.html',
  styleUrls: ['./personal.css'],
  providers: [  ]
})
export class PersonalComponent implements OnInit {


  constructor(private router: Router) {
    if(JSON.parse(sessionStorage.getItem('currentUser')) == null){
       this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {

  }

}
