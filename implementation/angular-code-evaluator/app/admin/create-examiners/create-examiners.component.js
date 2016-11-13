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
var CreateExaminersComponent = (function () {
    function CreateExaminersComponent(_router) {
        this._router = _router;
        this.Examiner = new examiner_1.Examiner();
    }
    CreateExaminersComponent.prototype.ngOnInit = function () {
        console.log("create examiners");
        this.conflictError = false;
        this.Examiner.name = "";
        this.SuccessCheck = false;
    };
    CreateExaminersComponent.prototype.onSubmit = function (form) {
        this.conflictError = false;
        this.SuccessCheck = true;
        console.log(this.Examiner);
        console.log(form.value);
    };
    CreateExaminersComponent.prototype.successCreate = function (Examiner) {
        console.log("Examiner Created successfully");
        this.conflictError = false;
        this.serverError = false;
        this.SuccessCheck = true;
        this.Examiner = { name: "" };
    };
    CreateExaminersComponent.prototype.failCreate = function (error) {
        if (error.status === 409) {
            this.SuccessCheck = false;
            this.serverError = false;
            this.conflictError = true;
            console.log("error during examiner creation");
        }
        else {
            this.SuccessCheck = false;
            this.conflictError = false;
            this.serverError = true;
            console.log("other error");
        }
    };
    CreateExaminersComponent = __decorate([
        core_1.Component({
            selector: 'create-examiners',
            templateUrl: 'app/admin/create-examiners/create-examiners.component.html',
            styleUrls: ['app/admin/create-examiners/create-examiners.component.css'],
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], CreateExaminersComponent);
    return CreateExaminersComponent;
}());
exports.CreateExaminersComponent = CreateExaminersComponent;
//# sourceMappingURL=create-examiners.component.js.map