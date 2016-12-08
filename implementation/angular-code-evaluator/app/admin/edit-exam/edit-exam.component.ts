import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ExamService } from './../exam.service'

import { Exam } from './../../model/exam';
import { Exercise } from './../../model/exercise';
import { ExerciseCriteria } from './../../model/exercise-criteria';
import { Student } from './../../model/student'


@Component({
    selector: 'edit-exam',
    templateUrl: 'app/admin/edit-exam/edit-exam.component.html',
    styleUrls: ['app/admin/edit-exam/edit-exam.component.css'],
})
export class EditExamComponent implements OnInit {

    private exam: Exam = new Exam();
    private exercises: Exercise[] = new Array<Exercise>();
    private students: Student[] = new Array<Student>();

    private successUpdate: boolean = false;
    private conflicError: boolean = false;
    private serverError: boolean = false;
    private exerciseWeightError: boolean = false;
    private criteriaWeightError: boolean = false;

    constructor(private _router: Router, private examService: ExamService,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {

        this.activatedRoute.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => this.examService.getExam(+params['id']))
            .subscribe(data => this.examSuccess(data),
            error => this.examFail(error));
    }

    examSuccess(data: any) {
        this.exam = data
        this.exercises = data.exercises;
        this.students = data.students;
    }

    examFail(error: any) {
        this._router.navigate(['/admin/view-exams/'])
    }

    onSubmit() {

        if (this.calcTotalWeight(this.exercises) !== 100.0) {

            this.successUpdate = false;
            this.criteriaWeightError = false;
            this.conflicError = false;
            this.serverError = false;
            this.exerciseWeightError = true;


        } else if (this.criteriaExceedsLimit(this.exercises)) {

            this.successUpdate = false;
            this.conflicError = false;
            this.serverError = false;
            this.exerciseWeightError = false;
            this.criteriaWeightError = true;

        } else {

            console.log(this.exercises);

/*            this.exam.exercises = this.exercises;

            this.examService.updateExam(this.exam)
                .subscribe(data => this.updateSuccess(data),
                error => this.updateFail(error));*/
        }

    }

    updateSuccess(data: any) {

        this.conflicError = false;
        this.criteriaWeightError = false;
        this.exerciseWeightError = false;
        this.serverError = false;
        this.successUpdate = true;

    }

    updateFail(error: any) {

        if (error.status === 409) {
            this.successUpdate = false;
            this.criteriaWeightError = false;
            this.exerciseWeightError = false;
            this.serverError = false;
            this.conflicError = false;
        } else {
            this.successUpdate = false;
            this.criteriaWeightError = false;
            this.exerciseWeightError = false;
            this.conflicError = false;
            this.serverError = true;
        }

    }

    private calcTotalWeight(list: Exercise[]): number {
        let i: number;
        let sum: number = 0;
        for (i = 0; i < list.length; i++) {
            sum += list[i].weight;
        }
        return sum;
    };

    private calcTotalWeightCriteria(list: ExerciseCriteria[]): number {
        let i: number;
        let sum: number = 0;
        for (i = 0; i < list.length; i++) {
            sum += list[i].weight;
        }
        return sum;
    };

    private criteriaExceedsLimit(exercises: Exercise[]): boolean {

        for (let i = 0; i < exercises.length; i++) {
            console.log(this.exercises[i].criteria)
            if (this.calcTotalWeightCriteria(exercises[i].criteria) !== 100.0) return true;
        }
        return false;
    }



}