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

import { NavigationService } from './../navigation.service'



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
    private exercises: Exercise[] = new Array<Exercise>();
    // list that always have the exercises - not represented in the html
    private nonfilteredExercises: Exercise[];
    private submissions: Submission[] = new Array<Submission>();
    private selectedExercise: Exercise = new Exercise();
    private selectedSubmission: Submission = new Submission();

    //ExaminerService
    private examinerUsername: string;
    private examiner: Examiner = new Examiner();

    private disableButton: boolean = true;

    private comments: string;

    constructor(private _router: Router, private authService: AuthService,
        private examinerService: ExaminerService, private navigationService: NavigationService) {
        this.oldStatus = "All";
    }

    ngOnInit() {
        this.header = this.authService.credentials;
        this.examinerUsername = this.authService.username;

        this.examinerService.getExaminer(this.examinerUsername)
            .subscribe(data => this.setExaminer(data),
            error => this.fail(error));

        this.examinerService.getExercisesByExaminer(this.authService.username).subscribe(data => this.successGetExercisesByExam(data),
            error => this.fail(error));

    }

    ngAfterViewInit() {
        this.updateMessage();
    }

    updateMessage() {
        //this.exercise = [];
    }

    successGetExercisesByExam(data: any) {
        this.setExercises(data);
        this.selectedExercise = this.exercises[0];

        if (!!this.selectedExercise){
            this.examinerService.getSubmissionsByExercise(this.exercises[0].id).subscribe(data => this.successGetSubmissionsByExercise(data),
                error => this.fail(error));
        }
    }

    successGetSubmissionsByExercise(data: any) {
        this.submissions = data;
    }

    private setExercises(data: any) {
        this.exercises = data;
        this.nonfilteredExercises = this.exercises.slice();
    }

    private cleanSelectedSubmission() {
        this.submissions = new Array<Submission>();
        this.selectedExercise = new Exercise();
        this.selectedSubmission = new Submission();

        this.disableButton = true;
        //this.selectedSubmission = null;
    }



    private filterByStatus(status: string): void {

        this.cleanSelectedSubmission();

        //validate input
        if (this.oldStatus == null || this.oldStatus == status) {
            this.oldStatus = status;
            return;
        }

        if (status == "All") {
            this.exercises = this.nonfilteredExercises.slice();
            return;
        } else
            if (status == "Open") {
                status = "O";
            } else if (status == "Closed") {
                status = "C";
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

        this.cleanSelectedSubmission();

        //validate input
        if (value == null || !value) {
            this.exercises = this.nonfilteredExercises.slice();
            return;
        }

        // clean list
        this.exercises = [];
        var arrayLength = this.nonfilteredExercises.length;
        for (var i = 0; i < arrayLength; i++) {
            if (this.nonfilteredExercises[i].exam.degree.toUpperCase().indexOf(value.toUpperCase()) !== -1) {
                // add the exercise that contais the degree entered by the user
                this.exercises.push(this.nonfilteredExercises[i]);
            }
        }
    }

    private isSelected(id: number): boolean {
        return id === this.selectedExercise.id;
    }

    private selectRow(exercise: Exercise): void {
        this.selectedExercise = exercise;
        this.selectedSubmission = new Submission();
        this.examinerService.getSubmissionsByExercise(exercise.id).subscribe(data => this.successGetSubmissionsByExercise(data),
            error => this.fail(error));
    }

    private isSelectedSubmission(id: number): boolean {
        if(this.isSelectedSubmission == null) return false;
        return id === this.selectedSubmission.id;
    }

    private selectRowSubmission(selectedSubmission: Submission): void {
        this.selectedSubmission = selectedSubmission;
        this.disableButton = false;
        this.comments = selectedSubmission.comment;
    }

    fail(error: any) {
        this._router.navigate(['/loginadmin']);
        console.log("Fail");

    }

    private setExaminer(data: any) {
        this.examiner = data;
    }

    private createIndexArray(array: any[]) {

        var indexArray: number[] = new Array<number>();
        var elem: any;

        for (elem in array) {
            indexArray.push(elem.id);
        }
        return indexArray;
    }

    private filterIdsFromSubmission(): number[] {
        var temps: Submission;
        var output: number[] = new Array<number>();
        for (var i = 0; i < this.submissions.length; i++) {
            output[i] = this.submissions[i].id;
        }

        return output;
    }

    private getComment(){
        return (!!this.selectedSubmission.comment)
                        ? (this.selectedSubmission.comment) : "";
    }

    //same for exercise or submission
    private getStatus(obj:any){
        return (obj.status === "C") ? "Closed" : "Open";
    }

    onSelect(submission: Submission) {
        //JUST FOR TESTING THE WORKSTATION SCREEN
        this.navigationService.buildService(this.filterIdsFromSubmission(), this.selectedSubmission.id);
        // this.navigationService.buildService( [1,2,3],1 );
        this._router.navigate(['/examiner/workstation', this.selectedSubmission.id]);

    }

    shouldDisableButton(): boolean {
        if( this.submissions === [] || this.selectedSubmission == null) return true; 
        return this.disableButton;
    }

    logout(){
        this.authService.logout();
    }

}	
