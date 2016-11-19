import {Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit}	from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {Submission} from './../../model/submission'
import {Exercise} from './../../model/exercise'
import {Exam} from './../../model/exam'

import {ExerciseCriteria} from './../../model/exercise-criteria'

import {SubmissionService} from './../submission.service'
import {ExamService} from './../../admin/exam.service'


declare var hljs: any;

@Component({	
    selector: 'workstation',	
	templateUrl: '/app/examiner/workstation/workstation.component.html',
    styleUrls: ['app/examiner/workstation/workstation.component.css'],
})
export	class	WorkstationComponent implements OnInit	{

    private submission = new Submission();
    private exercise = new Exercise();
    private exam = new Exam();

    private criteria = new Array<ExerciseCriteria>();
    private codeString:string = "";

    constructor(private _router:Router, private submissionService:SubmissionService,
                private activatedRoute:ActivatedRoute, private examService:ExamService){}
    
    @ViewChild('code') codeElement: ElementRef;

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
        this.exercise = data.exercise;
        this.codeString = data.code;

        this.codeElement.nativeElement.textContent = this.codeString;
        hljs.highlightBlock(this.codeElement.nativeElement);

        this.getExam(data.id);
    }

    fail(error:any){
        this._router.navigate(['/examiner/dashboard']);
    }

    getExam(id:number){
        this.examService.getExamBySubmission(id)
            .subscribe(data => this.examSuccess(data),
                       error => this.examFail(error));
    }

    examSuccess(data:any){
        this.exam = data;
    }

    examFail(error:any){
        this.fail(error)
    }

    private createArray(num:number):any[]{

        var array = Array.from(Array(num),(x,i)=>i);
        return array;
    }
}	