import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';
import { AuthService }    from './../../shared/auth.service';
import {Credentials} from './../../model/credentials';
import {Observable} from 'rxjs/Observable';


@Component({	
    selector: 'admin',	
	template: `<h1>DASHBOARD</h1>
    <button routerLink="/examiner/workstation"></button>`,
})
export	class	DashboardComponent implements OnInit	{

    private header:string;

    constructor(private authService:AuthService){
       
    }

    ngOnInit(){
        this.header = this.authService.credentials;
        console.log(this.header);
    }
}	