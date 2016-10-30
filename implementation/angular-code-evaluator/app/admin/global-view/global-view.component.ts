import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';

@Component({	
    selector: 'admin',	
	template: `<h1>GLOBAL VIEW</h1>`,
})
export	class	GlobalViewComponent implements OnInit	{

    constructor(private _router:Router){}

    ngOnInit(){
        console.log("global view");
    }
}	