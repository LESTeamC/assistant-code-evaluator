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
var exam_1 = require('./../../model/exam');
var exercise_1 = require('./../../model/exercise');
var submission_1 = require('./../../model/submission');
var student_1 = require('./../../model/student');
var exam_service_1 = require('./../exam.service');
var exercise_service_1 = require('./../../shared/exercise.service');
var submission_service_1 = require('./../../examiner/submission.service');
var GlobalViewComponent = (function () {
    function GlobalViewComponent(_router, examService, exerciseService, submissionSericse, activatedRoute) {
        this._router = _router;
        this.examService = examService;
        this.exerciseService = exerciseService;
        this.submissionSericse = submissionSericse;
        this.activatedRoute = activatedRoute;
        this.exam = new exam_1.Exam();
        this.exercises = new Array();
        this.submissions = new Array();
        this.criteria = new Array();
        this.grades = new Array();
        this.selectedExercise = new exercise_1.Exercise();
        this.selectedSubmission = new submission_1.Submission();
        this.selectedStudent = new student_1.Student();
        this.existsSelectedExercise = false;
        this.existsSelectedSubmission = false;
    }
    GlobalViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params
            .switchMap(function (params) { return _this.examService.getExam(+params['id']); })
            .subscribe(function (data) { return _this.examSuccess(data); }, function (error) { return _this.examFail(error); });
    };
    GlobalViewComponent.prototype.examSuccess = function (data) {
        var _this = this;
        this.exam = data;
        this.exercises = data.exercises;
        this.examService.getGrades(this.exam.id)
            .subscribe(function (data) { return _this.gradesSuccess(data); }, function (error) { return _this.gradesFail(error); });
    };
    GlobalViewComponent.prototype.examFail = function (error) {
        this._router.navigate(['/admin/view-exams/']);
    };
    GlobalViewComponent.prototype.gradesSuccess = function (data) {
        this.grades = data;
    };
    GlobalViewComponent.prototype.gradesFail = function (error) {
        this.examFail(error);
    };
    GlobalViewComponent.prototype.isSelectedExercise = function (exercise) {
        return exercise.id === this.selectedExercise.id;
    };
    GlobalViewComponent.prototype.isSelectedSubmission = function (submission) {
        return submission.id === this.selectedSubmission.id;
    };
    GlobalViewComponent.prototype.getSubmissions = function (exercise) {
        var _this = this;
        this.existsSelectedSubmission = false;
        this.existsSelectedExercise = true;
        this.selectedExercise = exercise;
        this.selectedSubmission = new submission_1.Submission();
        this.submissionSericse.getSubmissionsByExercise(exercise.id)
            .subscribe(function (data) { return _this.submissionSuccess(data); }, function (error) { return _this.submissionFail(error); });
    };
    GlobalViewComponent.prototype.selectSubmission = function (submission) {
        this.existsSelectedSubmission = true;
        this.selectedSubmission = submission;
        this.selectedStudent = submission.student;
        this.criteria = submission.criteria;
        console.log(this.criteria);
    };
    GlobalViewComponent.prototype.isGraded = function (submission) {
        return submission.status !== "O";
    };
    GlobalViewComponent.prototype.filterUngradedSubmission = function (criteria) {
        return (criteria.grade < 0) ? "N/A" : criteria.grade;
    };
    GlobalViewComponent.prototype.submissionSuccess = function (data) {
        this.submissions = data;
    };
    GlobalViewComponent.prototype.submissionFail = function (error) {
        this.examFail(error);
    };
    GlobalViewComponent.prototype.getExerciseGrade = function (g, i) {
        var grade = g.gradesByExercise[this.exercises[i].name];
        if (grade === undefined) {
            return "NS";
        }
        else if (grade === -1) {
            return "NE";
        }
        else {
            return grade;
        }
    };
    GlobalViewComponent.prototype.calculateExerciseAverage = function (name) {
        var sum = 0;
        var size = 0;
        for (var i = 0; i < this.grades.length; i++) {
            var grade = this.grades[i].gradesByExercise[name];
            if (grade >= 0) {
                sum += grade;
                size++;
            }
        }
        return (size > 0) ? (sum / size) : 0;
    };
    GlobalViewComponent.prototype.calculateGlobalAverage = function () {
        var globalGrades = this.getGlobalGrades();
        return this.calcAvg(globalGrades);
    };
    GlobalViewComponent.prototype.isEvaluated = function (g) {
        var ex;
        var returnValue = true;
        for (ex in g) {
            if (parseInt(g[ex]) < 0) {
                return false;
            }
        }
        return true;
    };
    GlobalViewComponent.prototype.getGlobalGrades = function () {
        var globalGrades = new Array();
        var s;
        for (var i = 0; i < this.grades.length; i++) {
            if (this.isEvaluated(this.grades[i].gradesByExercise)) {
                globalGrades.push(s.finalGrade);
            }
        }
        return globalGrades;
    };
    GlobalViewComponent.prototype.calcAvg = function (array) {
        if (array.length === 0)
            return 0;
        var sum = 0;
        for (var i = 0; i < array.length; i++) {
            sum += array[i]; //don't forget to add the base
        }
        var avg = sum / array.length;
    };
    /**
    * Shows modal
    */
    GlobalViewComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    /**
     * Hides modal
     */
    GlobalViewComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    __decorate([
        core_1.ViewChild('submissionModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], GlobalViewComponent.prototype, "childModal", void 0);
    GlobalViewComponent = __decorate([
        core_1.Component({
            selector: 'admin',
            templateUrl: 'app/admin/global-view/global-view.component.html',
            styleUrls: ['app/admin/global-view/global-view.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, exam_service_1.ExamService, exercise_service_1.ExerciseService, submission_service_1.SubmissionService, router_1.ActivatedRoute])
    ], GlobalViewComponent);
    return GlobalViewComponent;
}());
exports.GlobalViewComponent = GlobalViewComponent;
//# sourceMappingURL=global-view.component.js.map