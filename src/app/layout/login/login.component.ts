import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'angular-alert-module';
import { first } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';

import { AuthenticationService } from '../../services/authentication/authentication.service';


@Component({
  templateUrl: 'login.html',
  styleUrls: ['login.css'],
  providers: [ AlertService ]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {

                    this.router.navigate([this.returnUrl]);
                    //location.reload(true);
                },
                error => {
                    if(error.status == 401){
                      this.alertService.danger('Wrong username or password');
                    }else if (error.status == 404){
                      this.alertService.danger('Page not found');
                    }else if (error.status == 500 || error.status == 0){
                      this.alertService.danger('Internal Server Error');
                    }
              //        console.log({ type: 'error', message: error.statusText });
                  //}
                });
    }
}
