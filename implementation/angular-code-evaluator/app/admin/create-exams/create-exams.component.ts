import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';

@Component({	
    selector: 'create-exam',	
	templateUrl: 'app/admin/create-exams/create-exams.component.html',
    styleUrls: ['app/admin/create-exams/create-exams.component.css']
})
export	class	CreateExamsComponent implements OnInit	{

    constructor(private _router:Router){}

    ngOnInit(){
        console.log("create exams");
    }
}	