import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';


import { AlertService } from '../../services/alert/alert.service';

@Component({
    selector: 'alert',
    templateUrl: 'alert.html',
    styleUrls: ['alert.css'],
    providers: [ AlertService ]
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService) {

    }

    ngOnInit() {
      this.alertService.change.subscribe(message => {
        this.message = message;
        console.log('AlertComponent message ' + this.message.type);
      });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
