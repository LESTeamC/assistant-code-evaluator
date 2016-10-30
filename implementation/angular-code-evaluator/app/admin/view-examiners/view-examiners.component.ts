import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';

@Component({	
    selector: 'admin',	
	template: `<h1>VIEW EXAMINERS</h1>`,
})
export	class	ViewExaminersComponent implements OnInit	{

    constructor(private _router:Router){}

    ngOnInit(){
        console.log("view examiners");
    }
}	