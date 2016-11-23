import {Component, OnInit, ViewChild}	from '@angular/core';
import {Router} from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import {Exam} from './../../model/exam';
import {Exercise} from './../../model/exercise';
import {Submission} from './../../model/submission';
import {Student} from './../../model/student'

import {ExamService} from './../exam.service'
import {ExerciseService} from './../../shared/exercise.service'


@Component({	
    selector: 'admin',	
    templateUrl: '/app/admin/global-view/global-view.component.html',
    styleUrls: ['/app/admin/global-view/global-view.component.css']
})
export	class	GlobalViewComponent implements OnInit	{

    private id:number = 1;
    private exam:Exam = new Exam();
    private exercises:Exercise[] = new Array<Exercise>();
    private submissions:Submission[] = new Array<Submission>();

    constructor(private _router:Router, private examService:ExamService,
            private exerciseService:ExerciseService){}

    ngOnInit(){
        this.examService.getExam(this.id)
            .subscribe(data => this.examSuccess(data),
                       error => this.examFail(error));
    }

    examSuccess(data:any){
        this.exam = JSON.stringify(data);
        this.exercises = data.exercises;

        console.log(data);
    }

    examFail(error:any){
        this._router.navigate(['/admin/view-exams/'])
    }
}	