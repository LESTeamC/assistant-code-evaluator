import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';

@Component({	
    selector: 'examiner',	
	templateUrl: '/app/examiner/examiner.component.html',
    styleUrls: ['app/examiner/examiner.component.css']
})
export	class	ExaminerComponent implements OnInit	{

    constructor(private _router:Router){}

    ngOnInit(){
        console.log("examiner");
    }
}	
