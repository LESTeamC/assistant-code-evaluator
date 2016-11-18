import {Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit}	from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {Submission} from './../../model/submission'
import {ExerciseCriteria} from './../../model/exercise-criteria'

import {SubmissionService} from './../submission.service'

declare var hljs: any;

@Component({	
    selector: 'workstation',	
	templateUrl: '/app/examiner/workstation/workstation.component.html',
    styleUrls: ['app/examiner/workstation/workstation.component.css'],
})
export	class	WorkstationComponent implements OnInit	{

    private submission = new Submission();
    private criteria = new Array<ExerciseCriteria>();

    constructor(private _router:Router, private submissionService:SubmissionService,
                private activatedRoute:ActivatedRoute){}
    
    @ViewChild('code') codeElement: ElementRef;

    ngOnInit(){
        this.activatedRoute.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => this.submissionService.getSubmission(+params['id']))
            .subscribe(data => this.success(data),
                        error => this.fail(error));

    }

    success(data:any){
        console.log(2);
        this.submission = data;
        this.criteria = data.criteria;

        this.submission.code=`
        /* HelloWorld.java
 */

public class HelloWorld
{
	public static void main(String[] args) {
		System.out.println("Hello World!");
	}
}
        
        `
        console.log(this.codeElement.nativeElement)
        hljs.highlightBlock(this.codeElement.nativeElement);
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