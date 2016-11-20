import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { AuthService } from './../../shared/auth.service';
import { Credentials } from './../../model/credentials';
import { Observable } from 'rxjs/Observable';

import { ExaminerService } from './../../shared/examiner.service'
import { Exercise } from './../../model/exercise'
import { Submission } from './../../model/submission'
import { Exam } from './../../model/exam'
import { Examiner } from './../../model/examiner'



@Component({
    selector: 'dashboard',
    templateUrl: `app/examiner/dashboard/dashboard.component.html`,
    styleUrls: ['app/examiner/dashboard/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    // variable to get the chosen status
    private oldStatus: string;
    // header
    private header: string;
    // list that is represented in html
    private exercises: Exercise[];
    // list that always have the exercises - not represented in the html
    private nonfilteredExercises: Exercise[];
    private submissions: Submission[];
    private selectedRow: number = -1;
    //ExaminerService
    private examinerUsername: string;
    private examiner: Examiner = new Examiner();


    constructor(private _router: Router, private authService: AuthService, private examinerService: ExaminerService) {
        this.oldStatus = "All";
    }

    ngOnInit() {
        console.log("ngOnInit");
        this.header = this.authService.credentials;
        this.examinerUsername = this.authService.username;

        this.examinerService.getExaminer(this.examinerUsername)
            .subscribe(data => this.setExaminer(data),
            error => this.fail(error));

        this.examinerService.getExercisesByExaminer(this.authService.username).subscribe(data => this.successGetExercisesByExam(data),
            error => this.fail(error));

    }

    ngAfterViewInit() {
        console.log("ngAfterViewInit");
        this.updateMessage();
    }

    updateMessage() {
        //this.exercise = [];
    }

    successGetExercisesByExam(data: any) {
        this.setExercises(data);
        console.log("Golo!");
        this.examinerService.getSubmissionsByExercise(this.exercises[0].id).subscribe(data => this.successGetSubmissionsByExercise(data),
            error => this.fail(error));
    }

    successGetSubmissionsByExercise(data: any) {
        this.submissions = data;
        console.log("Golo!");

    }

    private setExercises(data: any) {
        this.exercises = data;
        this.nonfilteredExercises = this.exercises.slice();
    }

    private isSelected(id: number): boolean {
        return id === this.selectedRow;
    }

    private filterByStatus(status: string): void {
        console.log(status);
        //validate input
        if (this.oldStatus == null || this.oldStatus == status) {
            this.oldStatus = status;
            return;
        }

        if (status == "All") {
            this.exercises = this.nonfilteredExercises.slice();
            return;
        }

        // clean list
        this.exercises = [];
        var arrayLength = this.nonfilteredExercises.length;
        for (var i = 0; i < arrayLength; i++) {
            if (this.nonfilteredExercises[i].status === status) {
                this.exercises.push(this.nonfilteredExercises[i]);
            }
        }
        this.oldStatus = status;
    }

    private filterByDegree(value: string): void {
        //validate input
        if (value == null || !value) {
            this.exercises = this.nonfilteredExercises.slice();
            return;
        }

        // clean list
        this.exercises = [];
        var arrayLength = this.nonfilteredExercises.length;
        console.log(this.nonfilteredExercises);
        for (var i = 0; i < arrayLength; i++) {
            console.log(this.nonfilteredExercises[i].exam.degree);
            if (this.nonfilteredExercises[i].exam.degree.toUpperCase().indexOf(value.toUpperCase()) !== -1) {
                // add the exercise that contais the degree entered by the user
                this.exercises.push(this.nonfilteredExercises[i]);
            }
        }
    }

    private selectRow(id: number): void {
        console.log("SelectedRow!");
        this.examinerService.getSubmissionsByExercise(id).subscribe(data => this.successGetSubmissionsByExercise(data),
            error => this.fail(error));
    }

    fail(error: any) {
        // this._router.navigate(['/loginadmin']);
        console.log("Fail");

    }

    private setExaminer(data: any) {
        this.examiner = data;
    }


}	
