import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';
import {Response} from '@angular/http';

@Component({	
    selector: 'examiner',	
	templateUrl: '/app/examiner/examiner.component.html',
    styleUrls: ['app/examiner/examiner.component.css']
})
export	class	ExaminerComponent implements OnInit	{

    constructor(private _router:Router){}

    ngOnInit(){
    }

}	
