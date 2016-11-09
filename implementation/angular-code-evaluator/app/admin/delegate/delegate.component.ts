import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';

import {Examiner} from './../../model/examiner'
import {Exercise} from './../../model/exercise'

import {ExaminerService} from './../../shared/examiner.service'
import {ExerciseService} from './../../shared/exercise.service'


@Component({	
    selector: 'delegate',	
	templateUrl: `app/admin/delegate/delegate.component.html`,
})
export	class	DelegateComponent implements OnInit	{

    private examiners:Examiner[];
    private exercises:Exercise[];

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

    }

    successGetExercises(data:any){
        this.exercises = data;
        console.log(data)
    }

    failGetExercises(error:any){

    }
}	