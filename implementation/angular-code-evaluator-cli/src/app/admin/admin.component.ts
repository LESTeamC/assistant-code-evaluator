import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from './../shared/auth.service'

@Component({	
    selector: 'admin',	
	templateUrl: 'app/admin/admin.component.html',
    styleUrls: ['app/admin/admin.component.css']
})
export	class	AdminComponent implements OnInit	{

    constructor(private _router:Router, private authService:AuthService){}

    ngOnInit(){
        console.log("home");
    }

    logout(){
        this.authService.logout();
    }
}	
