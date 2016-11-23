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
var exam_1 = require('./../../model/exam');
var exam_service_1 = require('./../exam.service');
var exercise_service_1 = require('./../../shared/exercise.service');
var GlobalViewComponent = (function () {
    function GlobalViewComponent(_router, examService, exerciseService) {
        this._router = _router;
        this.examService = examService;
        this.exerciseService = exerciseService;
        this.id = 1;
        this.exam = new exam_1.Exam();
        this.exercises = new Array();
        this.submissions = new Array();
    }
    GlobalViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.examService.getExam(this.id)
            .subscribe(function (data) { return _this.examSuccess(data); }, function (error) { return _this.examFail(error); });
    };
    GlobalViewComponent.prototype.examSuccess = function (data) {
        this.exam = JSON.stringify(data);
        this.exercises = data.exercises;
        console.log(data);
    };
    GlobalViewComponent.prototype.examFail = function (error) {
        this._router.navigate(['/admin/view-exams/']);
    };
    GlobalViewComponent = __decorate([
        core_1.Component({
            selector: 'admin',
            templateUrl: '/app/admin/global-view/global-view.component.html',
            styleUrls: ['/app/admin/global-view/global-view.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, exam_service_1.ExamService, exercise_service_1.ExerciseService])
    ], GlobalViewComponent);
    return GlobalViewComponent;
}());
exports.GlobalViewComponent = GlobalViewComponent;
//# sourceMappingURL=global-view.component.js.map