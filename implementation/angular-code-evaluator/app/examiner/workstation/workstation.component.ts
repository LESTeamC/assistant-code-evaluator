import {Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit}	from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {Submission} from './../../model/submission'
import {Exercise} from './../../model/exercise'
import {Exam} from './../../model/exam'
import {Student} from './../../model/student'

import {ExerciseCriteria} from './../../model/exercise-criteria'
import {SubmissionCriteria} from './../../model/submissioncriteria'

import {TestData} from './../../util/testdata'

import {SubmissionService} from './../submission.service'
import {ExamService} from './../../admin/exam.service'
import {AuthService} from './../../shared/auth.service'
import {NavigationService} from './../navigation.service'

declare var hljs: any;

@Component({	
    selector: 'workstation',	
	templateUrl: '/app/examiner/workstation/workstation.component.html',
    styleUrls: ['app/examiner/workstation/workstation.component.css'],
})
export	class	WorkstationComponent implements OnInit	{

    //relevant variables for binding in DOM
    private submission = new Submission();
    private student = new Student();
    private exercise = new Exercise();
    private exam = new Exam();
    private codeLanguage:string = "";

    private comment:string = "";

    private criteria = new Array<SubmissionCriteria>();
    private codeString:string = "";
    private output:string = "";

    //error and success variables to show alert messages
    private gradeSuccess_:boolean = false;
    private successComment:boolean = false;
    private gradeError:boolean = false;

    constructor(private _router:Router, private submissionService:SubmissionService,
                private activatedRoute:ActivatedRoute, private examService:ExamService,
                private authService:AuthService, private navigationService:NavigationService){}
    
    @ViewChild('code') codeElement: ElementRef;

    /**
     * Init: Get submission and Exam content from API
     */
    ngOnInit(){

        if (this.navigationService.currentId === undefined){
            this._router.navigate(['/examiner/dashboard'])
        }

        this.activatedRoute.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => this.submissionService.getSubmission(+params['id']))
            .subscribe(data => this.success(data),
                        error => this.fail(error));

    }

    private isSubmitted():boolean{
        return (this.submission.status === "C");
    }

    /**
     * Success Funtion for call of Submission data
     * If successfull, get exam data!
     * @param: data: submission object
     */
    success(data:any){
        this.submission = data;
        this.criteria = data.criteria;
        this.exercise = data.exercise;
        this.student = data.student;
        this.comment = data.comment;
        
        //this.output = data.output;
        //this.codeString = data.code;

        //FOR DEMONSTRATION ONLY!!!
        this.codeString = TestData.codeBlock;
        this.output = TestData.longString;


        this.codeElement.nativeElement.textContent = this.codeString;
        hljs.highlightBlock(this.codeElement.nativeElement);

        this.getExam(data.id);
    }

    /**
     * Fail Funtion for call of Submission data
     * Navigates to dashboard
     */
    fail(error:any){
        this._router.navigate(['/examiner/dashboard']);
    }

    /**
     * Function to get Exam data from API
     * @param: id - Submission ID
     */
    getExam(id:number){
        this.examService.getExamBySubmission(id)
            .subscribe(data => this.examSuccess(data),
                       error => this.examFail(error));
    }

    examSuccess(data:any){
        this.exam = data;
        this.codeLanguage = data.language;
    }

    examFail(error:any){
        this.fail(error)
    }


    /**
     * Save evaluation in database.
     * When button is clicked
     */
    saveEvaluation(){

        //Set variables in main submission object
        this.submission.comment = this.comment;
        this.submission.exercise = this.exercise;
        this.submission.criteria = this.criteria;
        this.submission.grade = this.calcTotalGrade(this.criteria);

        this.submissionService.gradeSubmission(this.submission)
                .subscribe(data => this.gradeSuccess(data),
                           error => this.gradeFail(error));
    }


    simpleSave(){
        //Set variables in main submission object
        this.submission.comment = this.comment;
        this.submission.exercise = this.exercise;
        this.submission.criteria = this.criteria;
        this.submission.grade = this.calcTotalGrade(this.criteria);

        this.submissionService.gradeSubmission(this.submission)
                .subscribe(data => this.simpleGradeSuccess(data),
                           error => this.gradeFail(error));
    }

    simpleGradeSuccess(data:any){

        this.gradeError = false;

    }

    gradeSuccess(data:any){

        this.submission = data;
        this.exercise = data.exercise;
        this.comment = data.comment;
        //this.criteria = data.criteria;

        this.gradeError = false;
        this.gradeSuccess_ = true;

    }

    gradeFail(error:any){
        this.gradeSuccess_ = false;
        this.gradeError = true;
    }

    /**
     * Save comment in Db
     * When button is clicked
     */
    saveComment(){

         this.submissionService.insertComment(this.submission.id, this.comment)
                .subscribe(data => this.commentSuccess(data),
                           error => this.commentFail(error));       
    }

    commentSuccess(data:any){
        this.successComment = true;
    }

    commentFail(error:any){
        this.successComment = false;
    }

    /**
     * Auxiliary function to calculate grade in percentage
     * @param num: grade number
     * @param gama: maximum grade
     * @returns percentage value for grade
     */
    private calcGrade(num:any, gama:any):number{
        return Math.round(((num * 100 / gama) * 100.0) / 100.0);
    }


    /**
     * Auxiliary function to grade from list of criteria
     * @param subCriteria- Array of criteria
     * @returns percentage value for total grade given weights
     */
    private calcTotalGrade(subCriteria:SubmissionCriteria[]):number{
        var grade:number = 0;

        for (let s of subCriteria){

            var subGrade:any = (!s.grade || s.grade < 0) ? 0: s.grade;
                        //ignore this error
            grade += ((parseInt(subGrade) / s.criteria.gama) * s.criteria.weight);
        }

        return (grade < 0) ? 0: Math.round(grade * 100.0) / 100.0;

    }

    private calcGradeInValues(subCriteria:SubmissionCriteria[]):number{
    
        return Math.round(this.calcTotalGrade(subCriteria) * 20
                * 0.0001 * 100.0 * this.exercise.weight) / 100.0;
    }

    /**
     * Auxiliary function to tell if the grading process is incomplete
     * @returns true if there is at least one criteria ungraded, false otherwise
     */
    private existsUngraded():boolean{
        var ungraded:boolean = false;
        for (let s of this.criteria){
            if ((s.grade) < 0) return true;
        }

        return false;

    }

    /**
     * Auxiliary function to create an array os consecutive integers
     * @param num - maximum number in the array
     * @returns array of consecutive integers , like [0, 1, 2]
     */
    private createArray(num:number):number[]{

        var array = Array.from(Array(num + 1),(x,i)=>i);
        return array;
    }


    logout(){
        this.authService.logout();
    }

    goHome(){

        if (this.existsUngraded()){

            if( confirm("This submission is not totally evaluated yet."
                        + "If you proceed, your progress will not be saved."
                         + "Are you sure you want to proceed?") ){

                this._router.navigate(['/examiner/dashboard']);
            }   
            
        }else if (this.criteria.length > 0){
            this.saveEvaluation();
            this._router.navigate(['/examiner/dashboard']);
        }else{
            this._router.navigate(['/examiner/dashboard']);
        }
    }

    /**
     * Auxiliary function to help determine witch option to select
     */
    select(num:number, grade:any){

        console.log(num);
        console.log(grade);
        console.log(num === parseInt(grade));
        return num === parseInt(grade);
    }

    hasNextSubmission():boolean{
        return this.navigationService.existsNext();
    }

    hasPreviousSubmission():boolean{
        return this.navigationService.existsPrevious();
    }

    navigateNext():void{

        if (this.existsUngraded()){
            //PRESENT ALERT
            if( confirm("This submission is not totally evaluated yet."
                        + "If you proceed, your progress will not be saved."
                         + "Are you sure you want to proceed?") ){

                this.navigationService.navigateNext();
            }

        }else if (this.criteria.length > 0){
            this.simpleSave();
            this.navigationService.navigateNext();
            this.gradeError = false;
            this.gradeSuccess_ = false;
        }else{
            this.navigationService.navigateNext();
            this.gradeError = false;
            this.gradeSuccess_ = false;
        }

        
    }

    navigatePrevious():void{

        if (this.existsUngraded()){

             if( confirm("This submission is not totally evaluated yet."
                        + "If you proceed, your progress will not be saved."
                         + "Are you sure you want to proceed?") ){

                this.navigationService.navigatePrevious();
            }           

        }else if (this.criteria.length > 0){
            this.simpleSave();
            this.navigationService.navigatePrevious();
            this.gradeError = false;
            this.gradeSuccess_ = false;
        }else{
            this.navigationService.navigatePrevious();
            this.gradeError = false;
            this.gradeSuccess_ = false;
        }
        
    }



}	