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
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var exam_service_1 = require('./../exam.service');
var CreateExamsComponent = (function () {
    function CreateExamsComponent(_router, examService) {
        this._router = _router;
        this.examService = examService;
        this.exam = { name: "" };
    }
    CreateExamsComponent.prototype.ngOnInit = function () {
        console.log("create exams");
        this.conflictError = false;
        this.createdSuccess = false;
        this.exam.name = "";
    };
    CreateExamsComponent.prototype.onSubmit = function () {
        var _this = this;
        this.examService.createExam(this.exam)
            .subscribe(function (data) { return _this.successCreate(data); }, function (error) { return _this.failCreate(error); });
        console.log(this.exam);
    };
    CreateExamsComponent.prototype.successCreate = function (exam) {
        console.log("Exam Created successfully");
        this.conflictError = false;
        this.serverError = false;
        this.lastExamName = exam.name;
        this.createdSuccess = true;
        this.exam = {};
    };
    CreateExamsComponent.prototype.failCreate = function (error) {
        if (error.status === 409) {
            this.lastExamName = this.exam.name;
            this.createdSuccess = false;
            this.serverError = false;
            this.conflictError = true;
        }
        else {
            this.lastExamName = this.exam.name;
            this.createdSuccess = false;
            this.conflictError = false;
            this.serverError = true;
            console.log("other error");
        }
    };
    CreateExamsComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    CreateExamsComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    __decorate([
        core_1.ViewChild('childModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], CreateExamsComponent.prototype, "childModal", void 0);
    CreateExamsComponent = __decorate([
        core_1.Component({
            selector: 'create-exam',
            templateUrl: 'app/admin/create-exams/create-exams.component.html',
            styleUrls: ['app/admin/create-exams/create-exams.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, exam_service_1.ExamService])
    ], CreateExamsComponent);
    return CreateExamsComponent;
}());
exports.CreateExamsComponent = CreateExamsComponent;
//# sourceMappingURL=create-exams.component.js.map