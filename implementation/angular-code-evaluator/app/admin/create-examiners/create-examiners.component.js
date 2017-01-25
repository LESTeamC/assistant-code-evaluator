"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var examiner_1 = require('./../../model/examiner');
var account_1 = require('./../../model/account');
var examiner_service_1 = require('./../../shared/examiner.service');
var CreateExaminersComponent = (function () {
    function CreateExaminersComponent(_router, examinerService) {
        this._router = _router;
        this.examinerService = examinerService;
        this.examiner = new examiner_1.Examiner();
        this.account = new account_1.Account();
    }
    CreateExaminersComponent.prototype.ngOnInit = function () {
        this.examiner.account = this.account;
        console.log("create examiners");
        this.conflictError = false;
        this.SuccessCheck = false;
        this.confirmPass = "";
        this.passwordError = false;
    };
    //Submit form values with examiner info
    CreateExaminersComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.validatePW()) {
            this.examinerService.createExaminer(this.examiner)
                .subscribe(function (data) { return _this.successCreate(data); }, function (error) { return _this.failCreate(error); });
            console.log(this.examiner);
        }
        else {
            this.conflictError = false;
            this.serverError = false;
            this.passwordError = true;
            this.SuccessCheck = false;
        }
    };
    //examiner created successfully
    CreateExaminersComponent.prototype.successCreate = function (data) {
        console.log("Examiner Created successfully");
        this.conflictError = false;
        this.serverError = false;
        this.passwordError = false;
        this.SuccessCheck = true;
        this.confirmPass = "";
        this.account = new account_1.Account();
        this.examiner = new examiner_1.Examiner();
        this.examiner.account = this.account;
    };
    //examiner not created! error situation
    CreateExaminersComponent.prototype.failCreate = function (error) {
        if (error.status === 409) {
            this.SuccessCheck = false;
            this.serverError = false;
            this.passwordError = false;
            this.conflictError = true;
            console.log("error during examiner creation");
        }
        else {
            this.passwordError;
            this.SuccessCheck = false;
            this.conflictError = false;
            this.serverError = true;
            console.log("other error");
        }
    };
    //Password and confirm password fields verification
    CreateExaminersComponent.prototype.validatePW = function () {
        console.log(this.examiner.account.password);
        console.log(this.confirmPass);
        console.log(this.examiner.account.password !== this.confirmPass);
        if (this.examiner.account.password !== this.confirmPass) {
            return false;
        }
        else {
            return true;
        }
    };
    CreateExaminersComponent = __decorate([
        core_1.Component({
            selector: 'create-examiners',
            templateUrl: 'app/admin/create-examiners/create-examiners.component.html',
            styleUrls: ['app/admin/create-examiners/create-examiners.component.css'],
        }), 
        __metadata('design:paramtypes', [router_1.Router, examiner_service_1.ExaminerService])
    ], CreateExaminersComponent);
    return CreateExaminersComponent;
}());
exports.CreateExaminersComponent = CreateExaminersComponent;
//# sourceMappingURL=create-examiners.component.js.map