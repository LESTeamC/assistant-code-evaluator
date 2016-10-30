import {Component}	from '@angular/core';
import {Router} from '@angular/router';
import {Credentials} from './../model/credentials';


@Component({	
    selector: 'login-admin',	
	templateUrl: '/app/login/login-admin.component.html',
    styleUrls: ['app/login/login.component.css']
})
export	class	LoginAdminComponent	{

    constructor(private _router:Router){}

    login = new Credentials('', '');

    onSubmit(){
        console.log(this.login);
        this._router.navigate(['/admin/view-exams']);
    }
}	
