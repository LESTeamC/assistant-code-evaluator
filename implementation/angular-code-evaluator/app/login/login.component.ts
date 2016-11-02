import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from './../model/credentials';
import { LoginService } from './login.service'
import { Observable } from 'rxjs/Observable';


import { AuthService } from './../shared/auth.service';


@Component({
    selector: 'login',
    templateUrl: '/app/login/login.component.html',
    styleUrls: ['app/login/login.component.css'],
})
export class LoginComponent {

    private login = new Credentials('', '');
    private errorMessage = "";

    constructor(private _router: Router, private _authService: AuthService, private loginService: LoginService) {
    }

    onSubmit() {

        this.loginService.login(this.login.username, this.login.password)
            .subscribe(data => this.loginSuccess(data),
                       error => this.loginFail(error));
        
        this.login.password = "";
        this.login.username = "";
    }

    loginSuccess(data: any) {
        this._authService.setCredentials(this.login);
        this.errorMessage = "";
        this._router.navigate(['/examiner/dashboard']);
    }

    loginFail(error: any) {

        if (error.status === 401){
            this.errorMessage = "Invalid Credentials.";
        }else if(error.status === 403){
            this.errorMessage = "You don't have permission to access this feature."
        }else{
            this.errorMessage = "Could not connect to server. Try again later."
        }
    }
}	