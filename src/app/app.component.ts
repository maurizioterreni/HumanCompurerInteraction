import { Component, OnInit } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

//import { Environment } from './local/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
//  public environment: Environment;


  constructor(media: ObservableMedia) {
    // this.environment = new Environment();
  }

  ngOnInit() {

  }
}
