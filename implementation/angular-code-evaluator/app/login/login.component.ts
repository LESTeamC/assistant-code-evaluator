import {Component}	from '@angular/core';
import {Router} from '@angular/router';
import {Credentials} from './../model/credentials';

import { AuthService }    from './../shared/auth.service';


@Component({	
    selector: 'login',	
	templateUrl: '/app/login/login.component.html',
    styleUrls: ['app/login/login.component.css'],
})
export	class	LoginComponent	{

    private login = new Credentials('', '');
    constructor(private _router:Router, private _authService:AuthService){
    }

    onSubmit(){
        this._authService.setCredentials(this.login);
        this._router.navigate(['/examiner/dashboard']);
    }
}	
