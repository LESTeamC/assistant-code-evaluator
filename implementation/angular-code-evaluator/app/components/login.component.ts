import {Component}	from 'angular2/core';
import {Router} from 'angular2/router';

@Component({	
    selector: 'login',	
	templateUrl: '/app/templates/login.component.html'
})
export	class	LoginComponent	{

    constructor(private _router:Router){}

    onSubmit(form){
        console.log(form);
        console.log(form._value.password)
       // this._router.navigate(['Albums']);
    }

}	
