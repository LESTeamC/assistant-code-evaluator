import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';

@Component({	
    selector: 'admin',	
	template: `<h1>DASHBOARD</h1>
    <button routerLink="/examiner/workstation"></button>`,
})
export	class	DashboardComponent implements OnInit	{

    constructor(private _router:Router){}

    ngOnInit(){
        console.log("DASHBOARD");
    }
}	