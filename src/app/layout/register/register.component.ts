import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'angular-alert-module';
import { first } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  templateUrl: 'register.html',
  styleUrls: ['register.css'],
  providers: [ AlertService, AuthenticationService ]
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private router: Router,
        private alertService: AlertService) {}

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }


        this.authenticationService.register(this.f.username.value, this.f.password.value, this.f.email.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Registration completed!');
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  if (error.status == 404){
                    this.alertService.danger('Page not found');
                  }else if (error.status == 500 || error.status == 0){
                    this.alertService.danger('Internal Server Error');
                  }
            //        console.log({ type: 'error', message: error.statusText });
                //}
              });


    }
}
