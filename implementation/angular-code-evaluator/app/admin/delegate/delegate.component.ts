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
    private exercises:Exercise[];
    private selectedRow:number = -1;
    private selectedExaminer:Examiner = null;
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
        
        this.exerciseService.getExercises()
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
        console.log(this.exercises)
    }

    failGetExercises(error:any){
        this._router.navigate(['/loginadmin']);
    }

    successDelegate(data:any){
        this.exercises.find(d => d.id === this.selectedRow).examiner = this.selectedExaminer;
        this.lastDelegatedExercise = data;
        
        //this.selectedExaminer = (this.selectedExaminer === "null") ? null : this.selectedExaminer;

        if (!data.examiner){
            this.successDelegation = false;    
            this.failedDelegation = false;       
            this.successUndelegation = true;
        }else{
            this.successUndelegation = false;
            this.failedDelegation = false;
            this.successDelegation = true;
        }//alert
    }

    failDelegate(data:any){

        this.successUndelegation = false;
        this.successDelegation = false;
        this.failedDelegation = true;
        //alert
    }

    private isSelected(id:number):boolean{
        return id === this.selectedRow;
    }

    private selectRow(id:number):void{
        this.selectedRow = id;

        this.selectedExaminer =  this.exercises.find(d => d.id === id).examiner;

        console.log(this.selectedExaminer);
    }

    private selectExaminer():void{
        this.hideChildModal();

        //call delegate method on backend
        console.log(this.selectedExaminer);

        let examinerId:number = (this.selectedExaminer === null) ? undefined : this.selectedExaminer.id;

        this.exerciseService.delegateExercise(this.selectedRow, examinerId)
                .subscribe(data => this.successDelegate(data),
                           error => this.failDelegate(error));
    }

    private getExerciseFromId(id:number):string{
        return this.exercises.find(d => d.id === id).name;
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