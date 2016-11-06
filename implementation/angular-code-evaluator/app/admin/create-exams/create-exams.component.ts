import {Component, OnInit, ViewChild}	from '@angular/core';
import {Router} from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import {ExamService} from './../exam.service'


@Component({	
    selector: 'create-exam',	
	templateUrl: 'app/admin/create-exams/create-exams.component.html',
    styleUrls: ['app/admin/create-exams/create-exams.component.css']
})
export	class	CreateExamsComponent implements OnInit	{

    private exam = {name : ""};
    private lastExamName:string;

    //variables for each case
    private serverError:boolean;
    private conflictError:boolean;
    private createdSuccess:boolean;

    constructor(private _router:Router, private examService:ExamService){}

    ngOnInit(){
        console.log("create exams");
        this.conflictError = false;
        this.createdSuccess = false;
        this.exam.name = "";
    }

    onSubmit(){

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
        this.exam = {};
        
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

    @ViewChild('childModal') public childModal:ModalDirective;
 
    public showChildModal():void {
        this.childModal.show();
    }
        
    public hideChildModal():void {
        this.childModal.hide();
    }
}	