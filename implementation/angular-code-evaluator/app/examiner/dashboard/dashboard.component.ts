import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';
import { AuthService }    from './../../shared/auth.service';
import {Credentials} from './../../model/credentials';
import {Observable} from 'rxjs/Observable';


@Component({	
    selector: 'admin',	
	template: `<h1>DASHBOARD</h1>
    <button class="btn" (click)="onSelect(submission)"></button>`,
})
export	class	DashboardComponent implements OnInit	{

    private header:string;

    constructor(private _router:Router, private authService:AuthService){
       
    }

    ngOnInit(){
        this.header = this.authService.credentials;
        console.log(this.header);
    }

    onSelect(){

        //navigate passing the submission ID!
        this._router.navigate(['/examiner/workstation', 1]);
    }
}	