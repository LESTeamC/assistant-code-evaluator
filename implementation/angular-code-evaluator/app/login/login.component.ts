import {Component}	from '@angular/core';
import {Router} from '@angular/router';
import {Credentials} from './../model/credentials';


@Component({	
    selector: 'login',	
	templateUrl: '/app/login/login.component.html',
    styleUrls: ['app/login/login.component.css']
})
export	class	LoginComponent	{

    constructor(private _router:Router){}

    login = new Credentials('', '');

    onSubmit(){
        console.log(this.login);
        this._router.navigate(['/examiner/dashboard']);
    }
}	
