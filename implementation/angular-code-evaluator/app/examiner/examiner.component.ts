import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';
import {Response} from '@angular/http';

import {AuthService} from './../shared/auth.service'
import {ExaminerService} from './examiner.service'

import {Examiner} from './../model/examiner'

@Component({	
    selector: 'examiner',	
	templateUrl: '/app/examiner/examiner.component.html',
    styleUrls: ['app/examiner/examiner.component.css']
})
export	class	ExaminerComponent implements OnInit	{

    private examinerUsername:string;
    private examiner:Examiner = new Examiner();

    constructor(private _router:Router, private authService:AuthService, private examinerService:ExaminerService){}

    ngOnInit(){
        this.examinerUsername = this.authService.username;

        this.examinerService.getExaminer(this.examinerUsername)
            .subscribe(data => this.success(data),
                       error => this.fail(error));
    }

    private success(data: any){
        this.examiner = data;
    }

    private fail(error: any){
        this._router.navigate(['/login'])
    }
}	
