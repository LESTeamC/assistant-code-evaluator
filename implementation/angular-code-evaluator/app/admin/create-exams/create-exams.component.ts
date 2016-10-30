import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';

@Component({	
    selector: 'admin',	
	template: `<h1>CREATE EXAMs</h1>`,
})
export	class	CreateExamsComponent implements OnInit	{

    constructor(private _router:Router){}

    ngOnInit(){
        console.log("create exams");
    }
}	