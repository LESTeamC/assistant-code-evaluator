import {Component, OnInit, ViewChild}	from '@angular/core';
import {Router} from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import {Exam} from './../../model/exam';
import {Exercise} from './../../model/exercise';

import {ExamService} from './../exam.service'


@Component({	
    selector: 'create-exam',	
	templateUrl: 'app/admin/create-exams/create-exams.component.html',
    styleUrls: ['app/admin/create-exams/create-exams.component.css']
})
export	class	CreateExamsComponent implements OnInit	{

    private exam = new Exam();
    private exercises: Exercise[] = new Array<Exercise>();
    private currentExercise = new Exercise();
    

    private lastExamName:string;

    //variables for each case
    private serverError:boolean;
    private conflictError:boolean;
    private conflictErrorExercise:boolean;
    private weightErrorExercise:boolean;
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
        this.exam = {name : ""};
        
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
            console.log("other error")
        }

    }

    addExercise():void{

        if(this.hasName(this.exercises, this.currentExercise.name) >= 0){
            this.weightErrorExercise = false;
            this.conflictErrorExercise = true;
        }else if (this.calcTotalWeight(this.exercises) + this.currentExercise.weight > 100){
            this.conflictErrorExercise = false;
            this.weightErrorExercise = true;
        }else{
            this.exercises.push(this.currentExercise);
            this.currentExercise = new Exercise();
            this.weightErrorExercise = false;
            this.conflictErrorExercise = false;
            this.hideChildModal();
        }
        
    }

    deleteExercise(exercise:Exercise):void{
        let index = this.exercises.indexOf(exercise);
        if (index > -1){
            this.exercises.splice(index, 1);
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

    @ViewChild('exerciseModal') public childModal:ModalDirective;
 
    public showChildModal():void {
        this.childModal.show();
    }
        
    public hideChildModal():void {
        this.childModal.hide();
    }
}	