import {Component}	from '@angular/core';
import {Router} from '@angular/router';
import {Credentials} from './../model/credentials';

import { LoginService } from './login.service'
import { AuthService } from './../shared/auth.service';


@Component({	
    selector: 'login-admin',	
	templateUrl: '/app/login/login-admin.component.html',
    styleUrls: ['app/login/login.component.css']
})
/**
 * Component for the Admin Login
 */
export	class	LoginAdminComponent	{

    private login = new Credentials('', '');
    private errorMessage = "";

    constructor(private _router: Router, private _authService: AuthService, private loginService: LoginService) {
    }

    /**
     * Submits credetials to API to determine if valid or not;
     */
    onSubmit() {

        this.loginService.loginAdmin(this.login.username, this.login.password)
            .subscribe(data => this.loginSuccess(data),
                       error => this.loginFail(error));
    }

    /**
     * Success Funtion
     * Sets Credentials in shared service for other components to use 
     * Cleans error messages and navigates to admin dashboard
     * @param: Account returned from API
     */
    loginSuccess(data: any) {
        this._authService.setCredentials(this.login);
        this._authService.login("admin")
        this.errorMessage = "";
        this._router.navigate(['/admin/view-exams']);
    }

    /**
     * Fail Funtion
     * If error ir 401 (Unauthorized), tells user about invalid credentials. 
     * If error ir 403 (Forbidden), it's because user exists and PW is correct, but is not allowed in module
     * Else, generic error message
     * @param: error object
     */
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
