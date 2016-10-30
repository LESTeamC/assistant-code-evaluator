import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';

@Component({	
    selector: 'workstation',	
	template: `<h1>WORKSTATION</h1>
    <button routerLink="/examiner/dashboard"></button>`,
})
export	class	WorkstationComponent implements OnInit	{

    constructor(private _router:Router){}

    ngOnInit(){
        console.log("WORKSTATION");
    }
}	