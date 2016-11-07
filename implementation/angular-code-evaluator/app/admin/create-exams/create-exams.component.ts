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
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
export	class	CreateExamsComponent implements OnInit	{

    private exam = new Exam();
    private exercises: Exercise[] = new Array<Exercise>();
    private criteria: ExerciseCriteria[] = new Array<ExerciseCriteria>();
    
    private currentExercise = new Exercise();
    private currentCriteria = new ExerciseCriteria();
    

    private lastExamName:string;

    //variables for each case
    private serverError:boolean;
    private conflictError:boolean;
    private conflictErrorExercise:boolean;
    private weightErrorExercise:boolean;
    private weightErrorCriteria:boolean;
    private createdSuccess:boolean;

    constructor(private _router:Router, private examService:ExamService){}

    ngOnInit(){
        console.log("create exams");
        this.conflictError = false;
        this.createdSuccess = false;
        this.exam.name = "";
    }

    onSubmit(){

        this.exam.exercises = this.exercises;
        this.examService.createExam(this.exam)
            .subscribe(data => this.successCreate(data),
                       error => this.failCreate(error))

        console.log(this.exam);

    }

    successCreate(exam: any){
        console.log("Exam Created successfully")

        this.conflictError = false;
        this.serverError = false;
        this.lastExamName = exam.name;
        this.createdSuccess = true;
        this.exam = new Exam();
        this.exercises = new Array<Exercise>();
        
    }

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

    deleteExercise(exercise:Exercise):void{
        let index = this.exercises.indexOf(exercise);
        if (index > -1){
            this.exercises.splice(index, 1);
        }
    }

    addCriteria(){
        console.log(this.calcTotalWeightCriteria(this.criteria) + this.currentCriteria.weight)

        console.log(this.criteria);
        console.log(this.currentCriteria);

        if (this.calcTotalWeight(this.criteria) + this.currentCriteria.weight > 100){
            this.conflictErrorExercise = false;
            this.weightErrorExercise = false; 
            this.weightErrorCriteria = true;           
        }else{
            this.criteria.push(this.currentCriteria);
            this.currentCriteria = new ExerciseCriteria();
        }
    }

    deleteCriteria(criteria:ExerciseCriteria):void{
        let index = this.criteria.indexOf(criteria);
        if (index > -1){
            this.criteria.splice(index, 1);
        }
    }

    private hasName(list:Exercise[], name:string):number {
        let i:number;
        for (i = 0; i < list.length; i++) {
            if (list[i].name === name) {
                return i; //Returns element position, so it exists
            }
        }
        return -1; //The element isn't in your array
    };

    private calcTotalWeight(list:Exercise[]):number {
        let i:number;
        let sum:number = 0;
        for (i = 0; i < list.length; i++) {
            sum += list[i].weight;
        }
        return sum; //The element isn't in your array
    };

    private calcTotalWeightCriteria(list:ExerciseCriteria[]):number {
        let i:number;
        let sum:number = 0;
        for (i = 0; i < list.length; i++) {
            sum += list[i].weight;
        }
        return sum; //The element isn't in your array
    };

    @ViewChild('exerciseModal') public childModal:ModalDirective;
 
    public showChildModal():void {
        this.childModal.show();
    }
        
    public hideChildModal():void {
        this.childModal.hide();
    }
}	