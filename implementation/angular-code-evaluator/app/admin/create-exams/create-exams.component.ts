import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { Exam } from './../../model/exam';
import { Exercise } from './../../model/exercise';
import { ExerciseCriteria } from './../../model/exercise-criteria';
import { Student } from './../../model/student'
import { FileExercise } from './../../model/file-exercise'

import { ExamService } from './../exam.service'
import { CSVService } from './../csv.service'
import { UploadService } from './../upload.service'

import { Utils } from './../../util/util'

import { Observable } from 'rxjs/Rx';



@Component({
    selector: 'create-exam',
    templateUrl: 'app/admin/create-exams/create-exams.component.html',
    styleUrls: ['app/admin/create-exams/create-exams.component.css'],
})
/**
 * Create Exams Screen
 * @component.
 */
export class CreateExamsComponent implements OnInit {

    //Objects to use in Model and leter persist in Database (exam, exercises and criteria)
    private exam = new Exam();
    private exercises: Exercise[] = new Array<Exercise>();
    private criteria: ExerciseCriteria[] = new Array<ExerciseCriteria>();
    private students: any[] = new Array<any>();

    private exerciseFile: File = null;
    private files: FileExercise[] = new Array<FileExercise>();

    //Placeholder objects to use wile user is creating exercise
    private currentExercise = new Exercise();
    private currentCriteria = new ExerciseCriteria();

    //Auxiliary string to place on error message.
    private lastExamName: string;

    //Boolean variables for each kind of error (useful for displaying error messages)
    private serverError: boolean;
    private conflictError: boolean;
    private conflictErrorExercise: boolean;
    private weightErrorExercise: boolean;
    private weightErrorCriteria: boolean;
    private totalWeightErrorExercise: boolean;
    private totalWeightErrorCriteria: boolean;

    private createdSuccess: boolean;

    constructor(private _router: Router, private examService: ExamService,
        private csvService: CSVService, private uploadService: UploadService) { }

    ngOnInit() {

        //Initialize variables with FALSE on Init.
        this.serverError = false;
        this.conflictError = false;
        this.conflictErrorExercise = false;
        this.createdSuccess = false;
        this.weightErrorCriteria = false;
        this.weightErrorExercise = false;
        this.totalWeightErrorCriteria = false;
        this.totalWeightErrorExercise = false;
        //avoid error with date.
        this.exam.date = new Date();

    }

    /**
     * Submission function. Add created exercises to Exam and POST on server
     */
    onSubmit() {

        this.exam.exercises = this.exercises;
        this.exam.students = this.students;

        if (this.calcTotalWeight(this.exercises) !== 100.0){
            this.conflictError = false;
            this.serverError = false;
            this.createdSuccess = false;
            this.totalWeightErrorExercise = true;
        }else{

            this.examService.createExam(this.exam)
                .subscribe(data => this.successCreate(data),
                        error => this.failCreate(error));
        }

    }

    /**
     * Success Funtion. Restart variables and display success message
     * @param: Exam returned by server (created exam)
     */
    successCreate(exam: any) {

        this.conflictError = false;
        this.serverError = false;
        this.lastExamName = exam.name;
        this.totalWeightErrorExercise = false;
        this.createdSuccess = true;
        this.exam = new Exam();
        this.exam.date = new Date();
        this.exercises = new Array<Exercise>();
        this.students = new Array<Student>();

        this.getExerciseIds(exam);
        var token:string = this.buildExerciseToken();
        console.log(token);

        this.uploadFiles(token);

    }

    /**
     * Failure funtion.
     * If error status is 409 (CONFLICT), it means there is already an exam with the same name.
     * Else, show a generic error message.
     * @param error object returned by API
     */
    failCreate(error: any) {

        if (error.status === 409) {

            this.lastExamName = this.exam.name;
            this.createdSuccess = false;
            this.totalWeightErrorExercise = false;
            this.serverError = false;
            this.conflictError = true;
        } else {

            this.lastExamName = this.exam.name;
            this.createdSuccess = false;
            this.totalWeightErrorExercise = false;
            this.conflictError = false;
            this.serverError = true;
        }
    }


    uploadFiles(token:string) {

        console.log(this.createFileList());
        console.log(token);
/*        this.uploadService.uploadLibraries(this.createFileList(), token)
            .subscribe();*/
    }

    private createFileList(){
        var fileList:File[] = new Array<File>();

        for (let i =0 ; i < this.files.length ; i++){
            fileList.push(this.files[i].file);
        }

        return fileList;
    }

    /**
     * Adds exercise to list of created exercises
     * Checks if name already exists;
     * Checks if weight exceeds 100
     */
    addExercise(): void {

        if (this.hasName(this.exercises, this.currentExercise.name) >= 0) {
            this.weightErrorExercise = false;
            this.weightErrorCriteria = false;
            this.totalWeightErrorCriteria = false;
            this.conflictErrorExercise = true;
        } else if (this.calcTotalWeight(this.exercises) + this.currentExercise.weight > 100.0) {
            this.conflictErrorExercise = false;
            this.weightErrorCriteria = false;
            this.totalWeightErrorCriteria = false;
            this.weightErrorExercise = true;
        }else if (this.calcTotalWeightCriteria(this.criteria) !== 100.0){
            this.conflictErrorExercise = false;
            this.weightErrorCriteria = false;
            this.weightErrorExercise = false;        
            this.totalWeightErrorCriteria = true;
        } else {
            this.currentExercise.criteria = this.criteria;
            this.exercises.push(this.currentExercise);
            
            this.currentCriteria = new ExerciseCriteria();
            this.criteria = new Array<ExerciseCriteria>(),
            this.weightErrorExercise = false;
            this.conflictErrorExercise = false;
            this.weightErrorCriteria = false;
            this.totalWeightErrorCriteria = false;

            this.addLibraryFile(this.exerciseFile);
            this.currentExercise = new Exercise();
            this.exerciseFile = null;

            //console.log(this.files);

            this.hideChildModal();
        }

    }

    /**
     * Deletes Exercise from list
     * @param: exercise to delete;
     */
    deleteExercise(exercise: Exercise): void {
        let index = this.exercises.indexOf(exercise);
        if (index > -1) {
            this.exercises.splice(index, 1);
        }

        let indexf:number = this.findFile(exercise);
        if (index > -1) {
            this.files.splice(index, 1);
        }

        //console.log(this.files);
    }

    private findFile(exercise:Exercise):number{
        
        for (let i=0; i < this.files.length; i ++){
            if (this.files[i].exercise.name === exercise.name){
                return i;
            }
        }
        return -1;
    }

    /**
     * Adds criteria to list;
     * Checks if total weight exceeds 100
     */
    addCriteria() {

        if (this.calcTotalWeight(this.criteria) + this.currentCriteria.weight > 100) {
            this.conflictErrorExercise = false;
            this.weightErrorExercise = false;
            this.totalWeightErrorCriteria = false;
            this.weightErrorCriteria = true;
        } else {
            this.weightErrorCriteria = false;
            this.criteria.push(this.currentCriteria);
            this.currentCriteria = new ExerciseCriteria();
        }
    }

    /**
     * Deletes criteria from list
     * @param: criteria to delete
     */
    deleteCriteria(criteria: ExerciseCriteria): void {
        let index = this.criteria.indexOf(criteria);
        if (index > -1) {
            this.criteria.splice(index, 1);
        }
    }

    /**
     * Checks if a list of exercises has an object with a given name value
     * @param: list of exercises
     * @param: string name
     * @returns: -1 if false, the index if true
     */
    private hasName(list: Exercise[], name: string): number {
        let i: number;
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
    private calcTotalWeight(list: Exercise[]): number {
        let i: number;
        let sum: number = 0;
        for (i = 0; i < list.length; i++) {
            sum += list[i].weight;
        }
        return sum;
    };

    /**
     * Calculates total weight value of a list of criteria
     * @param: list of criteria
     * @returns: total weight value
     */
    private calcTotalWeightCriteria(list: ExerciseCriteria[]): number {
        let i: number;
        let sum: number = 0;
        for (i = 0; i < list.length; i++) {
            sum += list[i].weight;
        }
        return sum;
    };

    private getExerciseIds(exam:Exam){

        for (let i = 0; i < this.files.length ; i++){
            for (let j = 0; j < exam.exercises.length; j++){
                if (exam.exercises[j].name === this.files[i].exercise.name){
                    this.files[i].id = exam.exercises[j].id;
                }
            }
        }

    }

    private buildExerciseToken(){
        var token:string = "";
        for (let j = 0; j < this.files.length; j++){
            if (!!this.files[j].id){
                if (j === 0) {
                    token += this.files[j].id.toString()
                }else{
                    token += "_" + this.files[j].id.toString()
                }
            }
            
        }

        return token;
    }


    private uploadCSV($event: any) {

        var file: any = $event.target.files[0];
        var subscription = this.csvService.getStudentsFromCSV(file)
            .subscribe((data: any) => this.students = data);

    }

    addLibraryFile(file: File) {
        this.files.push(new FileExercise(file, this.currentExercise));

        console.log(this.files);
    }

    selectFile($event: any) {
        this.exerciseFile = $event.target.files[0];
        //console.log($event.target.files[0]);
    }

    @ViewChild('exerciseModal') public childModal: ModalDirective;

    /**
    * Shows modal
    */
    public showChildModal(): void {
        this.childModal.show();
    }

    /**
     * Hides modal
     */
    public hideChildModal(): void {
        this.childModal.hide();
    }

    private closeModal():void{
        this.exerciseFile = null;
        this.hideChildModal(); 
    }
}	