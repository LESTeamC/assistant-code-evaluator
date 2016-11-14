import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { Examiner } from './../../model/examiner';
import { Account } from './../../model/account';
import { ExaminerService } from './../../shared/examiner.service'

import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'create-examiners',
    templateUrl: 'app/admin/create-examiners/create-examiners.component.html',
    styleUrls: ['app/admin/create-examiners/create-examiners.component.css'],
})
export class CreateExaminersComponent implements OnInit {

    private examiner = new Examiner();
    private account = new Account();

    private SuccessCheck: boolean;
    private conflictError: boolean;
    private serverError: boolean;
    private passwordError: boolean;

    private confirmPass: string;

    constructor(private _router: Router, private examinerService: ExaminerService) { }

    ngOnInit() {

        this.examiner.account=this.account;
        console.log("create examiners");
        this.conflictError = false;
        this.SuccessCheck = false;
        this.confirmPass = "";
        this.passwordError = false;

    }

    //Submit form values with examiner info
    onSubmit() {

        if (this.validatePW()) {
            this.examinerService.createExaminer(this.examiner)
                .subscribe(data => this.successCreate(data),
                error => this.failCreate(error));
            console.log(this.examiner);
        } else {
            this.conflictError = false;
            this.serverError = false;
            this.passwordError = true;
            this.SuccessCheck = false;
        }


    }

    //examiner created successfully
    successCreate(data: any) {
        console.log("Examiner Created successfully")

        this.conflictError = false;
        this.serverError = false;
        this.passwordError = false;
        this.SuccessCheck = true;
        this.confirmPass = "";
        this.account = new Account();
        this.examiner = new Examiner();
        this.examiner.account = this.account;
    }

    //examiner not created! error situation
    failCreate(error: any) {
        if (error.status === 409) {
            this.SuccessCheck = false;
            this.serverError = false;
            this.passwordError = false;
            this.conflictError = true;
            console.log("error during examiner creation")
        }
        else {
            this.passwordError;
            this.SuccessCheck = false;
            this.conflictError = false;
            this.serverError = true;
            console.log("other error")
        }
    }

    //Password and confirm password fields verification
    private validatePW() {

        console.log(this.examiner.account.password);
        console.log(this.confirmPass);
        console.log(this.examiner.account.password !== this.confirmPass);
        if (this.examiner.account.password !== this.confirmPass) {
            return false;
        }
        else {
            return true;
        }
    }
}
