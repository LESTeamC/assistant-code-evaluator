import {Component, OnInit, ViewChild}	from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import {Exam} from './../../model/exam';
import {Exercise} from './../../model/exercise';
import {Submission} from './../../model/submission';
import {Student} from './../../model/student'
import {SubmissionCriteria} from './../../model/submissioncriteria'
import {Grade} from './../../model/grade'


import {ExamService} from './../exam.service'
import {ExerciseService} from './../../shared/exercise.service'
import {SubmissionService} from './../../examiner/submission.service'



@Component({	
    selector: 'admin',	
    templateUrl: 'app/admin/global-view/global-view.component.html',
    styleUrls: ['app/admin/global-view/global-view.component.css']
})
export	class	GlobalViewComponent implements OnInit	{

    private exam:Exam = new Exam();
    private exercises:Exercise[] = new Array<Exercise>();
    private submissions:Submission[] = new Array<Submission>();
    private criteria:SubmissionCriteria[] = new Array<SubmissionCriteria>();
    private grades:Grade[] = new Array<Grade>();

    private selectedExercise:Exercise = new Exercise();
    private selectedSubmission:Submission = new Submission();
    private selectedStudent:Student = new Student();

    private existsSelectedExercise:boolean = false;
    private existsSelectedSubmission:boolean = false;

    constructor(private _router:Router, private examService:ExamService,
            private exerciseService:ExerciseService,
            private submissionSericse:SubmissionService,
            private activatedRoute:ActivatedRoute,){

            
    }

    ngOnInit(){

        this.activatedRoute.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => this.examService.getExam(+params['id']))
            .subscribe(data => this.examSuccess(data),
                        error => this.examFail(error));

    }

    examSuccess(data:any){
        this.exam = data
        this.exercises = data.exercises;

        this.examService.getGrades(this.exam.id)
            .subscribe(data => this.gradesSuccess(data),
                       error => this.gradesFail(error));

    }

    examFail(error:any){
        this._router.navigate(['/admin/view-exams/'])
    }

    gradesSuccess(data:any){
        this.grades = data
    }

    gradesFail(error:any){
        this.examFail(error);
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

    getExerciseGrade(g:Grade, i:number):any{

         var grade = g.gradesByExercise[this.exercises[i].name];

         if (grade === undefined) {
             return "NS";
         }else if (grade === -1){
             return "NE"
         }else{
             return (Math.round(grade * 100) / 100).toFixed(2);
         }

    }

    calculateExerciseAverage(name:string){

        var sum = 0;
        var size = 0;

        for (var i = 0; i < this.grades.length; i++){

            var grade = this.grades[i].gradesByExercise[name];
            if (grade >= 0){
                sum += grade;
                size ++; 
            }
        }
        return (size > 0) ? (Math.round((sum/size) * 100) / 100) : 0;
    }

    calculateGlobalAverage(){

        var globalGrades = this.getGlobalGrades();
        return Math.round(this.calcAvg(globalGrades) * 100.0) / 100.0;
    }

    private isEvaluated(g:any):boolean{
        var ex:any;
        var returnValue:boolean = true;
        for (ex in g){
            if (parseInt(g[ex]) < 0) {
                return false;
            }
        }
        return true;
    }

    private getGlobalGrades(){
        var globalGrades:number[] = new Array<number>();
        var s:any;

        for (let i = 0; i < this.grades.length; i++){
            if(this.isEvaluated(this.grades[i].gradesByExercise)){
                globalGrades.push(this.grades[i].finalGrade);
            }
        }
        return globalGrades;
    }

    private calcAvg(array:number[]){

        if (array.length === 0) return 0;

        var sum = 0;
        for( var i = 0; i < array.length; i++ ){
            sum += array[i]; 

        }
        return sum/array.length;
    }

    private calculateValueOfSubmission(s: Submission):number{

        return Math.round(s.grade * 
            this.selectedExercise.weight * 0.01 * 
            (20.0 / 100.0) * 100.0) / 100.0;
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