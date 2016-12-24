import {Component, OnInit, ViewChild}	from '@angular/core';
import {Router} from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import {Examiner} from './../../model/examiner'
import {Exercise} from './../../model/exercise'

import {ExaminerService} from './../../shared/examiner.service'
import {ExerciseService} from './../../shared/exercise.service'


@Component({	
    selector: 'delegate',	
	templateUrl: `app/admin/delegate/delegate.component.html`,
    styleUrls: ['app/admin/delegate/delegate.component.css']
})
export	class	DelegateComponent implements OnInit	{

    private examiners:Examiner[];
    private exercises:Exercise[] = new Array<Exercise>();

    private selectedExercise:Exercise = new Exercise();
    private selectedExaminer:Examiner = null;
    private selectedExaminerModal:Examiner = null;

    private lastDelegatedExercise:Exercise;

    //Alert variables
    private successDelegation:boolean = false;
    private successUndelegation:boolean = false;
    private failedDelegation:boolean = false;

    constructor(private _router:Router, private examinerService:ExaminerService,
                                        private exerciseService:ExerciseService){}

    ngOnInit(){

        this.examinerService.getExaminers()
            .subscribe(data => this.successGetExaminers(data),
                       error => this.failGetExaminers(error));
        
        this.exerciseService.getOpenExercises()
            .subscribe(data => this.successGetExercises(data),
                       error => this.failGetExercises(error));
    }

    successGetExaminers(data:any){
        this.examiners = data;
    }

    failGetExaminers(error:any){
        this._router.navigate(['/loginadmin']);
    }

    successGetExercises(data:any){
        this.exercises = data;
    }

    failGetExercises(error:any){
        this._router.navigate(['/loginadmin']);
    }

    successDelegate(data:any){
        this.exercises.find(d => d.id === this.selectedExercise.id).examiner = this.selectedExaminerModal;
        this.lastDelegatedExercise = data;
        
        if (!data.examiner){
            this.successDelegation = false;    
            this.failedDelegation = false;       
            this.successUndelegation = true;
        }else{
            this.successUndelegation = false;
            this.failedDelegation = false;
            this.successDelegation = true;
        }
    }

    failDelegate(data:any){

        this.successUndelegation = false;
        this.successDelegation = false;
        this.failedDelegation = true;
    }

    private isSelected(id:number):boolean{
        return id === this.selectedExercise.id;
    }

    private selectRow(exercise:Exercise):void{
        this.selectedExercise = exercise;
        this.selectedExaminer = exercise.examiner;
        this.selectedExaminerModal = null;
        
    }

    private selectExaminer():void{
        this.hideChildModal();

        this.selectedExaminerModal = (this.selectedExaminerModal === "null") ? null : this.selectedExaminerModal;
        let examinerId:number = (this.selectedExaminerModal === null) ? undefined : this.selectedExaminerModal.id;

        this.exerciseService.delegateExercise(this.selectedExercise.id, examinerId)
                .subscribe(data => this.successDelegate(data),
                           error => this.failDelegate(error));
    }

    private isSelectedExaminer(examiner:Examiner){

        if (examiner === null || this.selectedExaminer ===null ) return false; 
        return examiner.name === this.selectedExaminer.name;
    }


    @ViewChild('examinerModal') public childModal:ModalDirective;
 
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