import {Component, OnInit, ViewChild}	from '@angular/core';
import {Router} from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import {Exam} from './../../model/exam';
import {Exercise} from './../../model/exercise';
import {Submission} from './../../model/submission';
import {Student} from './../../model/student'
import {SubmissionCriteria} from './../../model/submissioncriteria'


import {ExamService} from './../exam.service'
import {ExerciseService} from './../../shared/exercise.service'
import {SubmissionService} from './../../examiner/submission.service'



@Component({	
    selector: 'admin',	
    templateUrl: 'app/admin/global-view/global-view.component.html',
    styleUrls: ['app/admin/global-view/global-view.component.css']
})
export	class	GlobalViewComponent implements OnInit	{

    private id:number = 1;
    private exam:Exam = new Exam();
    private exercises:Exercise[] = new Array<Exercise>();
    private submissions:Submission[] = new Array<Submission>();
    private criteria:SubmissionCriteria[] = new Array<SubmissionCriteria>();

    private selectedExercise:Exercise = new Exercise();
    private selectedSubmission:Submission = new Submission();
    private selectedStudent:Student = new Student();

    private existsSelectedExercise:boolean = false;
    private existsSelectedSubmission:boolean = false;

    constructor(private _router:Router, private examService:ExamService,
            private exerciseService:ExerciseService,
            private submissionSericse:SubmissionService){

            
    }

    ngOnInit(){
        this.examService.getExam(this.id)
            .subscribe(data => this.examSuccess(data),
                       error => this.examFail(error));
    }

    examSuccess(data:any){
        this.exam = data
        this.exercises = data.exercises;

        console.log(data);
    }

    examFail(error:any){
        this._router.navigate(['/admin/view-exams/'])
    }

    private isSelectedExercise(exercise:Exercise):boolean{
        return exercise.id === this.selectedExercise.id;
    }

    private isSelectedSubmission(submission:Submission):boolean{
        return submission.id === this.selectedSubmission.id;
    }

    private getSubmissions(exercise:Exercise):void{

        this.existsSelectedSubmission = false;
        this.existsSelectedExercise = true;

        this.selectedExercise = exercise;
        this.selectedSubmission = new Submission();

        this.submissionSericse.getSubmissionsByExercise(exercise.id)
                    .subscribe(data => this.submissionSuccess(data),
                       error => this.submissionFail(error));

    }

    private selectSubmission(submission:Submission){

        this.existsSelectedSubmission = true;

        this.selectedSubmission = submission;
        this.selectedStudent = submission.student;
        this.criteria = submission.criteria;
        console.log(this.criteria);
    }

    private isGraded(submission:Submission){
        return submission.status !== "O";
    }

    filterUngradedSubmission(criteria:SubmissionCriteria){
        return (criteria.grade < 0) ? "N/A" : criteria.grade
    }

    submissionSuccess(data:any){
        this.submissions = data;

    }

    submissionFail(error:any){
        this.examFail(error);
    }

    @ViewChild('submissionModal') public childModal:ModalDirective;
 
     /**
     * Shows modal
     */
    public showChildModal():void {
        this.childModal.show();
    }
    
    /**
     * Hides modal
     */
    public hideChildModal():void {
        this.childModal.hide();
    }


}	