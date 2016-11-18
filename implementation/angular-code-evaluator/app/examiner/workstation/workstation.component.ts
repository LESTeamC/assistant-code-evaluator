import {Component, OnInit, ElementRef, ViewChild}	from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {Submission} from './../../model/submission'
import {ExerciseCriteria} from './../../model/exercise-criteria'

import {SubmissionService} from './../submission.service'

@Component({	
    selector: 'workstation',	
	templateUrl: '/app/examiner/workstation/workstation.component.html',
    styleUrls: ['app/examiner/workstation/workstation.component.css']
})
export	class	WorkstationComponent implements OnInit	{

    private submission = new Submission();
    private criteria = new Array<ExerciseCriteria>();

    constructor(private _router:Router, private submissionService:SubmissionService,
                private activatedRoute:ActivatedRoute){}
    
    private code:string= this.submission.code;

    ngOnInit(){
        this.activatedRoute.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => this.submissionService.getSubmission(+params['id']))
            .subscribe(data => this.success(data),
                        error => this.fail(error));

    }

    success(data:any){
        this.submission = data;
        this.criteria = data.criteria;
    }

    fail(error:any){
        this._router.navigate(['/examiner/dashboard']);
    }

    private createArray(num:number):any[]{

        var array = Array.from(Array(num),(x,i)=>i);
        console.log(array);

        return array;
    }
}	