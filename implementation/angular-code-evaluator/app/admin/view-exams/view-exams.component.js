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
var csv_service_1 = require('./../csv.service');
var exam_1 = require('./../../model/exam');
var ViewExamsComponent = (function () {
    function ViewExamsComponent(_router, examService, csvService) {
        this._router = _router;
        this.examService = examService;
        this.csvService = csvService;
        this.exams = new Array();
        this.exportedGrades = new Array();
        this.selectedExam = new exam_1.Exam();
        this.deleteSuccess = false;
        this.deleteFail = false;
        this.exportFail = false;
        this.selectedSorter = "date";
        this.messageEdit = '';
        this.messageExport = '';
    }
    ViewExamsComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("view exams");
        this.examService.getExams()
            .subscribe(function (data) { return _this.examsSuccess(data); }, function (error) { return _this.examsFail(error); });
    };
    ViewExamsComponent.prototype.isSelected = function (id) {
        return id === this.selectedExam.id;
    };
    ViewExamsComponent.prototype.selectRow = function (exam) {
        this.selectedExam = exam;
    };
    ViewExamsComponent.prototype.examsSuccess = function (data) {
        this.exams = data;
    };
    ViewExamsComponent.prototype.examsFail = function (error) {
    };
    ViewExamsComponent.prototype.editExam = function () {
        this._router.navigate(['/admin/edit-exam', this.selectedExam.id]);
    };
    /**
    * Shows modal
    */
    ViewExamsComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    /**
     * Hides modal
     */
    ViewExamsComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    ViewExamsComponent.prototype.exportGrade = function () {
        var _this = this;
        this.examService.getGrades(this.selectedExam.id)
            .subscribe(function (data) { return _this.successGrades(data); }, function (error) { return _this.failGrades(error); });
    };
    ViewExamsComponent.prototype.successGrades = function (data) {
        this.exportedGrades = data;
        if (!this.csvService.downloadCSV(this.exportedGrades, this.selectedExam.exercises, this.selectedExam.name))
            this.exportFail = true;
    };
    ViewExamsComponent.prototype.failGrades = function (error) {
    };
    ViewExamsComponent.prototype.importSubmission = function () {
        this._router.navigate(['/admin/import-submission', this.selectedExam.id]);
    };
    ViewExamsComponent.prototype.globalView = function () {
        this._router.navigate(['/admin/global-view/', this.selectedExam.id]);
    };
    ViewExamsComponent.prototype.deleteExam = function () {
        var _this = this;
        this.hideChildModal();
        this.examService.deleteExam(this.selectedExam.id)
            .subscribe(function (data) { return _this.deleteExamSuccess(data); }, function (error) { return _this.deleteExamFail(error); });
    };
    ViewExamsComponent.prototype.deleteExamSuccess = function (data) {
        this.exams = this.removeFromArray(this.exams, this.selectedExam.id);
        this.selectedExam = new exam_1.Exam();
        this.exportFail = false;
        this.deleteFail = false;
        this.deleteSuccess = true;
    };
    ViewExamsComponent.prototype.deleteExamFail = function (error) {
        this.exportFail = false;
        this.deleteFail = false;
        this.deleteSuccess = true;
    };
    ViewExamsComponent.prototype.removeFromArray = function (array, id) {
        return array.filter(function (el) {
            return el.id !== id;
        });
    };
    ViewExamsComponent.prototype.changeSorter = function (sorter) {
        this.selectedSorter = sorter;
    };
    __decorate([
        core_1.ViewChild('deleteModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], ViewExamsComponent.prototype, "childModal", void 0);
    ViewExamsComponent = __decorate([
        core_1.Component({
            selector: 'view-exams',
            templateUrl: 'app/admin/view-exams/view-exams.component.html',
            styleUrls: ['app/admin/view-exams/view-exams.component.css'],
        }), 
        __metadata('design:paramtypes', [router_1.Router, exam_service_1.ExamService, csv_service_1.CSVService])
    ], ViewExamsComponent);
    return ViewExamsComponent;
}());
exports.ViewExamsComponent = ViewExamsComponent;
//# sourceMappingURL=view-exams.component.js.map