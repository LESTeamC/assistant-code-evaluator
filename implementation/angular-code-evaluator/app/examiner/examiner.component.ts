import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';

@Component({	
    selector: 'examiner',	
	templateUrl: '/app/examiner/examiner.component.html',
})
export	class	ExaminerComponent implements OnInit	{

    constructor(private _router:Router){}

    ngOnInit(){
        console.log("examiner");
    }
}	
