import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';

@Component({	
    selector: 'admin',	
	template: `<h1>View Exams</h1>`,
})
export	class	ViewExamsComponent implements OnInit	{

    constructor(private _router:Router){}

    ngOnInit(){
        console.log("View Exams");
    }
}	