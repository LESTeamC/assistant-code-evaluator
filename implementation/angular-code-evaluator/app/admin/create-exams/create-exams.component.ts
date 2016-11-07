import {Component, OnInit, ViewChild}	from '@angular/core';
import {Router} from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import {Exam} from './../../model/exam';
import {Exercise} from './../../model/exercise';
import {ExerciseCriteria} from './../../model/exercise-criteria';

import {ExamService} from './../exam.service'


@Component({	
    selector: 'create-exam',	
	templateUrl: 'app/admin/create-exams/create-exams.component.html',
    styleUrls: ['app/admin/create-exams/create-exams.component.css']
})
/**
 * Create Exams Screen
 * @component.
 */
export	class	CreateExamsComponent implements OnInit	{

    //Objects to use in Model and leter persist in Database (exam, exercises and criteria)
    private exam = new Exam();
    private exercises: Exercise[] = new Array<Exercise>();
    private criteria: ExerciseCriteria[] = new Array<ExerciseCriteria>();
    
    //Placeholder objects to use wile user is creating exercise
    private currentExercise = new Exercise();
    private currentCriteria = new ExerciseCriteria();

    //Auxiliary string to place on error message.
    private lastExamName:string;

    //Boolean variables for each kind of error (useful for displaying error messages)
    private serverError:boolean;
    private conflictError:boolean;
    private conflictErrorExercise:boolean;
    private weightErrorExercise:boolean;
    private weightErrorCriteria:boolean;
    private createdSuccess:boolean;

    constructor(private _router:Router, private examService:ExamService){}

    ngOnInit(){

        //Initialize variables with FALSE on Init.
        this.serverError = false;
        this.conflictError = false;
        this.conflictErrorExercise = false;
        this.createdSuccess = false;
        this.weightErrorCriteria = false;
        this.weightErrorExercise = false;

    }

    /**
     * Submission funtion. Add created exercises to Exam and POST on server
     */
    onSubmit(){

        this.exam.exercises = this.exercises;
        this.examService.createExam(this.exam)
            .subscribe(data => this.successCreate(data),
                       error => this.failCreate(error));

    }

    /**
     * Success Funtion. Restart variables and display success message
     * @param: Exam returned by server (created exam)
     */
    successCreate(exam: any){
        console.log("Exam Created successfully")

        this.conflictError = false;
        this.serverError = false;
        this.lastExamName = exam.name;
        this.createdSuccess = true;
        this.exam = new Exam();
        this.exercises = new Array<Exercise>();
        
    }

    /**
     * Failure funtion.
     * If error status is 409 (CONFLICT), it means there is already an exam with the same name.
     * Else, show a generic error message.
     * @param error object returned by API
     */
    failCreate(error: any){

        if (error.status === 409){

            this.lastExamName = this.exam.name;
            this.createdSuccess = false;
            this.serverError = false;
            this.conflictError = true;
        }else {

            this.lastExamName = this.exam.name;
            this.createdSuccess = false;
            this.conflictError = false;
            this.serverError = true;
        }

    }

    /**
     * Adds exercise to list of created exercises
     * Checks if name already exists;
     * Checks if weight exceeds 100
     */
    addExercise():void{

        if(this.hasName(this.exercises, this.currentExercise.name) >= 0){
            this.weightErrorExercise = false;
            this.weightErrorCriteria = false;
            this.conflictErrorExercise = true;
        }else if (this.calcTotalWeight(this.exercises) + this.currentExercise.weight > 100){
            this.conflictErrorExercise = false;
            this.weightErrorCriteria = false;
            this.weightErrorExercise = true;
        }else{
            this.currentExercise.criteria = this.criteria;
            this.exercises.push(this.currentExercise);
            this.currentExercise = new Exercise();
            this.weightErrorExercise = false;
            this.conflictErrorExercise = false;
            this.weightErrorCriteria = false;
            this.hideChildModal();
        }
        
    }

    /**
     * Deletes Exercise from list
     * @param: exercise to delete;
     */
    deleteExercise(exercise:Exercise):void{
        let index = this.exercises.indexOf(exercise);
        if (index > -1){
            this.exercises.splice(index, 1);
        }
    }

    /**
     * Adds criteria to list;
     * Checks if total weight exceeds 100
     */
    addCriteria(){

        if (this.calcTotalWeight(this.criteria) + this.currentCriteria.weight > 100){
            this.conflictErrorExercise = false;
            this.weightErrorExercise = false; 
            this.weightErrorCriteria = true;           
        }else{
            this.criteria.push(this.currentCriteria);
            this.currentCriteria = new ExerciseCriteria();
        }
    }

    /**
     * Deletes criteria from list
     * @param: criteria to delete
     */
    deleteCriteria(criteria:ExerciseCriteria):void{
        let index = this.criteria.indexOf(criteria);
        if (index > -1){
            this.criteria.splice(index, 1);
        }
    }

    /**
     * Checks if a list of exercises has an object with a given name value
     * @param: list of exercises
     * @param: string name
     * @returns: -1 if false, the index if true
     */
    private hasName(list:Exercise[], name:string):number {
        let i:number;
        for (i = 0; i < list.length; i++) {
            if (list[i].name === name) {
                return i; //Returns element position, so it exists
            }
        }
        return -1; //The element isn't in your array
    };

    /**
     * Calculates total weight value of a list of execises
     * @param: list of exercises
     * @returns: total weight value
     */
    private calcTotalWeight(list:Exercise[]):number {
        let i:number;
        let sum:number = 0;
        for (i = 0; i < list.length; i++) {
            sum += list[i].weight;
        }
        return sum; //The element isn't in your array
    };

    /**
     * Calculates total weight value of a list of criteria
     * @param: list of criteria
     * @returns: total weight value
     */
    private calcTotalWeightCriteria(list:ExerciseCriteria[]):number {
        let i:number;
        let sum:number = 0;
        for (i = 0; i < list.length; i++) {
            sum += list[i].weight;
        }
        return sum; //The element isn't in your array
    };

    @ViewChild('exerciseModal') public childModal:ModalDirective;
 
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