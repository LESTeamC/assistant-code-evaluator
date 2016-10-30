import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';

@Component({	
    selector: 'admin',	
	template: `<h1>CREATE EXAMINERS</h1>`,
})
export	class	CreateExaminersComponent implements OnInit	{

    constructor(private _router:Router){}

    ngOnInit(){
        console.log("create examiners");
    }
}	
