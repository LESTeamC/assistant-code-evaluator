import {Component}	from '@angular/core';
import {Router} from '@angular/router';
import {Credentials} from './../model/credentials';
import {LoginService} from './login.service'

import { AuthService }    from './../shared/auth.service';


@Component({	
    selector: 'login',	
	templateUrl: '/app/login/login.component.html',
    styleUrls: ['app/login/login.component.css'],
})
export	class	LoginComponent	{

    private login = new Credentials('', '');
    private whatever:any;


    constructor(private _router:Router, private _authService:AuthService, private loginService:LoginService){
    }

    onSubmit(){

        this.loginService.login(this.login.username)
                        .subscribe(data => this.whatever = data);
        
        console.log(this.whatever)

        this._authService.setCredentials(this.login);
        this._router.navigate(['/examiner/dashboard']);
    }
}	
