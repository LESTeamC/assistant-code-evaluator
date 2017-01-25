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
var submission_1 = require('./../../model/submission');
var exercise_1 = require('./../../model/exercise');
var exam_1 = require('./../../model/exam');
var student_1 = require('./../../model/student');
var submission_service_1 = require('./../submission.service');
var exam_service_1 = require('./../../admin/exam.service');
var auth_service_1 = require('./../../shared/auth.service');
var navigation_service_1 = require('./../navigation.service');
var WorkstationComponent = (function () {
    function WorkstationComponent(_router, submissionService, activatedRoute, examService, authService, navigationService) {
        this._router = _router;
        this.submissionService = submissionService;
        this.activatedRoute = activatedRoute;
        this.examService = examService;
        this.authService = authService;
        this.navigationService = navigationService;
        //relevant variables for binding in DOM
        this.submission = new submission_1.Submission();
        this.student = new student_1.Student();
        this.exercise = new exercise_1.Exercise();
        this.exam = new exam_1.Exam();
        this.codeLanguage = "";
        this.comment = "";
        this.criteria = new Array();
        this.codeString = "";
        this.output = "";
        //error and success variables to show alert messages
        this.gradeSuccess_ = false;
        this.successComment = false;
        this.gradeError = false;
    }
    /**
     * Init: Get submission and Exam content from API
     */
    WorkstationComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.navigationService.currentId === undefined) {
            this._router.navigate(['/examiner/dashboard']);
        }
        this.activatedRoute.params
            .switchMap(function (params) { return _this.submissionService.getSubmission(+params['id']); })
            .subscribe(function (data) { return _this.success(data); }, function (error) { return _this.fail(error); });
    };
    WorkstationComponent.prototype.isSubmitted = function () {
        return (this.submission.status === "C");
    };
    /**
     * Success Funtion for call of Submission data
     * If successfull, get exam data!
     * @param: data: submission object
     */
    WorkstationComponent.prototype.success = function (data) {
        this.submission = data;
        this.criteria = data.criteria;
        this.exercise = data.exercise;
        this.student = data.student;
        this.comment = (data.comment === null) ? "" : data.comment;
        this.output = data.output;
        this.codeString = data.code;
        //FOR DEMONSTRATION ONLY!!!
        //this.codeString = TestData.codeBlock;
        //this.output = TestData.longString;
        this.codeElement.nativeElement.textContent = this.codeString;
        hljs.highlightBlock(this.codeElement.nativeElement);
        this.getExam(data.id);
    };
    /**
     * Fail Funtion for call of Submission data
     * Navigates to dashboard
     */
    WorkstationComponent.prototype.fail = function (error) {
        this._router.navigate(['/examiner/dashboard']);
    };
    /**
     * Function to get Exam data from API
     * @param: id - Submission ID
     */
    WorkstationComponent.prototype.getExam = function (id) {
        var _this = this;
        this.examService.getExamBySubmission(id)
            .subscribe(function (data) { return _this.examSuccess(data); }, function (error) { return _this.examFail(error); });
    };
    WorkstationComponent.prototype.examSuccess = function (data) {
        this.exam = data;
        this.codeLanguage = data.language;
    };
    WorkstationComponent.prototype.examFail = function (error) {
        this.fail(error);
    };
    /**
     * Save evaluation in database.
     * When button is clicked
     */
    WorkstationComponent.prototype.saveEvaluation = function () {
        var _this = this;
        //Set variables in main submission object
        this.submission.comment = this.comment;
        this.submission.exercise = this.exercise;
        this.submission.criteria = this.criteria;
        this.submission.grade = this.calcTotalGrade(this.criteria);
        this.submissionService.gradeSubmission(this.submission)
            .subscribe(function (data) { return _this.gradeSuccess(data); }, function (error) { return _this.gradeFail(error); });
    };
    WorkstationComponent.prototype.simpleSave = function () {
        var _this = this;
        //Set variables in main submission object
        this.submission.comment = this.comment;
        this.submission.exercise = this.exercise;
        this.submission.criteria = this.criteria;
        this.submission.grade = this.calcTotalGrade(this.criteria);
        this.submissionService.gradeSubmission(this.submission)
            .subscribe(function (data) { return _this.simpleGradeSuccess(data); }, function (error) { return _this.gradeFail(error); });
    };
    WorkstationComponent.prototype.simpleGradeSuccess = function (data) {
        this.gradeError = false;
    };
    WorkstationComponent.prototype.gradeSuccess = function (data) {
        this.submission = data;
        this.exercise = data.exercise;
        this.comment = data.comment;
        //this.criteria = data.criteria;
        this.gradeError = false;
        this.gradeSuccess_ = true;
    };
    WorkstationComponent.prototype.gradeFail = function (error) {
        this.gradeSuccess_ = false;
        this.gradeError = true;
    };
    /**
     * Save comment in Db
     * When button is clicked
     */
    WorkstationComponent.prototype.saveComment = function () {
        var _this = this;
        this.submissionService.insertComment(this.submission.id, this.comment)
            .subscribe(function (data) { return _this.commentSuccess(data); }, function (error) { return _this.commentFail(error); });
    };
    WorkstationComponent.prototype.commentSuccess = function (data) {
        this.successComment = true;
    };
    WorkstationComponent.prototype.commentFail = function (error) {
        this.successComment = false;
    };
    /**
     * Auxiliary function to calculate grade in percentage
     * @param num: grade number
     * @param gama: maximum grade
     * @returns percentage value for grade
     */
    WorkstationComponent.prototype.calcGrade = function (num, gama) {
        return Math.round(((num * 100 / gama) * 100.0) / 100.0);
    };
    /**
     * Auxiliary function to grade from list of criteria
     * @param subCriteria- Array of criteria
     * @returns percentage value for total grade given weights
     */
    WorkstationComponent.prototype.calcTotalGrade = function (subCriteria) {
        var grade = 0;
        for (var _i = 0, subCriteria_1 = subCriteria; _i < subCriteria_1.length; _i++) {
            var s = subCriteria_1[_i];
            var subGrade = (!s.grade || s.grade < 0) ? 0 : s.grade;
            //ignore this error
            grade += ((parseInt(subGrade) / s.criteria.gama) * s.criteria.weight);
        }
        return (grade < 0) ? 0 : Math.round(grade * 100.0) / 100.0;
    };
    WorkstationComponent.prototype.calcGradeInValues = function (subCriteria) {
        return Math.round(this.calcTotalGrade(subCriteria) * 20
            * 0.0001 * 100.0 * this.exercise.weight) / 100.0;
    };
    /**
     * Auxiliary function to tell if the grading process is incomplete
     * @returns true if there is at least one criteria ungraded, false otherwise
     */
    WorkstationComponent.prototype.existsUngraded = function () {
        var ungraded = false;
        for (var _i = 0, _a = this.criteria; _i < _a.length; _i++) {
            var s = _a[_i];
            if ((s.grade) < 0)
                return true;
        }
        return false;
    };
    /**
     * Auxiliary function to create an array os consecutive integers
     * @param num - maximum number in the array
     * @returns array of consecutive integers , like [0, 1, 2]
     */
    WorkstationComponent.prototype.createArray = function (num) {
        var array = Array.from(Array(num + 1), function (x, i) { return i; });
        return array;
    };
    WorkstationComponent.prototype.logout = function () {
        this.authService.logout();
    };
    WorkstationComponent.prototype.goHome = function () {
        if (this.existsUngraded()) {
            if (confirm("This submission is not totally evaluated yet."
                + "If you proceed, your progress will not be saved."
                + "Are you sure you want to proceed?")) {
                this.saveComment();
                this._router.navigate(['/examiner/dashboard']);
            }
        }
        else if (this.criteria.length > 0) {
            this.saveEvaluation();
            this._router.navigate(['/examiner/dashboard']);
        }
        else {
            this._router.navigate(['/examiner/dashboard']);
        }
    };
    /**
     * Auxiliary function to help determine witch option to select
     */
    WorkstationComponent.prototype.select = function (num, grade) {
        console.log(num);
        console.log(grade);
        console.log(num === parseInt(grade));
        return num === parseInt(grade);
    };
    WorkstationComponent.prototype.hasNextSubmission = function () {
        return this.navigationService.existsNext();
    };
    WorkstationComponent.prototype.hasPreviousSubmission = function () {
        return this.navigationService.existsPrevious();
    };
    WorkstationComponent.prototype.navigateNext = function () {
        if (this.existsUngraded()) {
            //PRESENT ALERT
            if (confirm("This submission is not totally evaluated yet."
                + "If you proceed, your progress will not be saved."
                + "Are you sure you want to proceed?")) {
                this.saveComment();
                this.navigationService.navigateNext();
            }
        }
        else if (this.criteria.length > 0) {
            this.simpleSave();
            this.navigationService.navigateNext();
            this.gradeError = false;
            this.gradeSuccess_ = false;
        }
        else {
            this.navigationService.navigateNext();
            this.gradeError = false;
            this.gradeSuccess_ = false;
        }
    };
    WorkstationComponent.prototype.navigatePrevious = function () {
        if (this.existsUngraded()) {
            if (confirm("This submission is not totally evaluated yet."
                + "If you proceed, your progress will not be saved."
                + "Are you sure you want to proceed?")) {
                this.saveComment();
                this.navigationService.navigatePrevious();
            }
        }
        else if (this.criteria.length > 0) {
            this.simpleSave();
            this.navigationService.navigatePrevious();
            this.gradeError = false;
            this.gradeSuccess_ = false;
        }
        else {
            this.navigationService.navigatePrevious();
            this.gradeError = false;
            this.gradeSuccess_ = false;
        }
    };
    __decorate([
        core_1.ViewChild('code'), 
        __metadata('design:type', core_1.ElementRef)
    ], WorkstationComponent.prototype, "codeElement", void 0);
    WorkstationComponent = __decorate([
        core_1.Component({
            selector: 'workstation',
            templateUrl: '/app/examiner/workstation/workstation.component.html',
            styleUrls: ['app/examiner/workstation/workstation.component.css'],
        }), 
        __metadata('design:paramtypes', [router_1.Router, submission_service_1.SubmissionService, router_1.ActivatedRoute, exam_service_1.ExamService, auth_service_1.AuthService, navigation_service_1.NavigationService])
    ], WorkstationComponent);
    return WorkstationComponent;
}());
exports.WorkstationComponent = WorkstationComponent;
//# sourceMappingURL=workstation.component.js.map