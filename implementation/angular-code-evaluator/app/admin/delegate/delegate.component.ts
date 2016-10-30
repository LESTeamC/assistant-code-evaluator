import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';

@Component({	
    selector: 'admin',	
	template: `<h1>DELEGATE</h1>`,
})
export	class	DelegateComponent implements OnInit	{

    constructor(private _router:Router){}

    ngOnInit(){
        console.log("Delegate");
    }
}	