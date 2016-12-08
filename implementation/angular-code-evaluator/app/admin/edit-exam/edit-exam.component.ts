import {Component, OnInit, ViewChild}	from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {ExamService} from './../exam.service'

import {Exam} from './../../model/exam';
import {Exercise} from './../../model/exercise';
import { Student } from './../../model/student'


@Component({
    selector: 'edit-exam',
    templateUrl: 'app/admin/edit-exam/edit-exam.component.html',
    styleUrls: ['app/admin/edit-exam/edit-exam.component.css'],
})
export class EditExamComponent implements OnInit {

    private exam:Exam = new Exam();
    private exercises:Exercise[] = new Array<Exercise>();
    private students: Student[] = new Array<Student>();

    constructor(private _router:Router, private examService:ExamService,
            private activatedRoute:ActivatedRoute) { }

    ngOnInit() {

        this.activatedRoute.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => this.examService.getExam(+params['id']))
            .subscribe(data => this.examSuccess(data),
                        error => this.examFail(error));
    }

    examSuccess(data:any){
        this.exam = data
        this.exercises = data.exercises;
        this.students = data.students;
    }

    examFail(error:any){
        this._router.navigate(['/admin/view-exams/'])
    }
}