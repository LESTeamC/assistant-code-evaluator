import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { Examiner } from './../../model/examiner';
import { Account } from './../../model/account';
import { ExaminerService } from './../../shared/examiner.service'

@Component({
    selector: 'edit-examiner',
    templateUrl: 'app/admin/edit-examiner/edit-examiner.component.html',
    styleUrls: ['app/admin/create-examiners/create-examiners.component.css'],
})
export class EditExaminerComponent implements OnInit {

    private examiner: Examiner = new Examiner();
    private account: Account = new Account();

    private password: string = ""
    private confirmPassword: string = "";

    private changePW: boolean = false;

    private successUpdate: boolean = false;
    private serverError: boolean = false;
    private conflictError: boolean = false;
    private passwordError: boolean = false;

    constructor(private _router: Router, private examinerService: ExaminerService,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {

        this.activatedRoute.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => this.examinerService.getExaminer(params['username']))
            .subscribe(data => this.examinerSuccess(data),
                        error => this.examinerFail(error));
    }

    examinerSuccess(data: any) {
        this.examiner = data;
    }

    examinerFail(error: any) {
        this._router.navigate(['/admin/view-examiners/'])
    }

    toggleCheckBox() {
        this.changePW = !this.changePW;
        console.log(this.changePW);
    }

    updateExaminer() {

        if (this.changePW) this.examiner.account.password = this.password;

        console.log(this.examiner);

        this.examinerService.updateExaminer(this.examiner)
            .subscribe(data => this.examinerUpdateSuccess(data),
            error => this.examinerUpdateFail(error));

    }

    doUpdate() {

        if (this.changePW && this.password !== this.confirmPassword) {
            this.successUpdate = false;
            this.serverError = false;
            this.conflictError = false;
            this.passwordError = true;
        }
        else if (this.changePW) {
            this.passwordError = false;
            if (!this.childModal.isShown) {
                this.showChildModal();
            } else {
                this.hideChildModal();
                this.updateExaminer();
            }
        } else {
            this.updateExaminer();
        }
    }

    examinerUpdateSuccess(data: any) {
        this.conflictError = false;
        this.serverError = false;
        this.passwordError = false;
        this.successUpdate = true;
    }

    examinerUpdateFail(error: any) {

        if (error.status === 409) {
            this.successUpdate = false;
            this.serverError = false;
            this.passwordError = false;
            this.conflictError = true;
        } else {
            this.successUpdate = false;
            this.conflictError = false;
            this.passwordError = false;
            this.serverError = true;
        }
    }


    @ViewChild('confirmModal') public childModal: ModalDirective;

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
}