import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';
import { AuthService }    from './../../shared/auth.service';
import {Credentials} from './../../model/credentials';
import {Observable} from 'rxjs/Observable';

import {ExaminerService} from './../../shared/examiner.service'

import {Examiner} from './../../model/examiner'

@Component({	
    selector: 'admin',	
	templateUrl: 'app/examiner/dashboard/dashboard.component.html',
    styleUrls: ['app/examiner/dashboard/dashboard.component.css']
})
export	class	DashboardComponent implements OnInit	{
    private examinerUsername:string;
    private examiner:Examiner = new Examiner();

    constructor(private _router:Router, private authService:AuthService, private examinerService:ExaminerService){}

    ngOnInit(){
        this.examinerUsername = this.authService.username;

        this.examinerService.getExaminer(this.examinerUsername)
            .subscribe(data => this.success(data),
                       error => this.fail(error));
    }

    private logout(){
        this.authService.logout();
    }

    private success(data: any){
        this.examiner = data;
    }

    private fail(error: any){
        this._router.navigate(['/login'])
    }

    onSelect(){
        //navigate passing the submission ID!
        this._router.navigate(['/examiner/workstation', 1]);
    }
}	