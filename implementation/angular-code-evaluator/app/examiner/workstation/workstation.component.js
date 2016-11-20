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
var WorkstationComponent = (function () {
    function WorkstationComponent(_router, submissionService, activatedRoute, examService, authService) {
        this._router = _router;
        this.submissionService = submissionService;
        this.activatedRoute = activatedRoute;
        this.examService = examService;
        this.authService = authService;
        //DEMONSTRATION VARIABLE ONLY. DELETE FOR RELEASE
        this.testLongString = "\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et ligula venenatis, convallis odio ornare, posuere quam. Phasellus molestie leo purus, sit amet iaculis nunc gravida id. Curabitur pretium lacus eget consequat interdum. Vivamus augue leo, tempor sit amet gravida quis, fringilla in nisl. Aenean pretium blandit ligula. Integer dignissim, mauris vel consequat porttitor, arcu urna accumsan ante, ac blandit sapien mauris at magna. Praesent ultrices molestie viverra. Sed pellentesque tempor consectetur. Curabitur faucibus risus eget elit gravida hendrerit. Integer odio lectus, faucibus a bibendum eu, sollicitudin ut massa. Nam et eros eu justo hendrerit tincidunt viverra quis augue. Nullam ac rutrum diam. Ut nec sem dignissim ante tristique molestie et a lorem. Vivamus egestas quam vitae sollicitudin vehicula. Fusce elementum lacus et metus blandit, et pulvinar dui maximus. Mauris at ultrices turpis.\n\nProin auctor efficitur eros id vehicula. Vivamus porttitor porttitor nibh, a iaculis nunc gravida accumsan. Sed tristique justo purus, vitae posuere elit ultricies a. Praesent eros nunc, accumsan a tempus et, dapibus in orci. Quisque placerat sit amet orci sit amet maximus. Fusce rhoncus placerat massa sed consectetur. Sed semper bibendum libero et vulputate. Nunc pulvinar magna et justo iaculis aliquam. Praesent aliquet nibh tortor, vel scelerisque leo suscipit quis.\n\nIn hac habitasse platea dictumst. Morbi a bibendum arcu, ut porta diam. Etiam congue ante non blandit vulputate. Duis feugiat viverra felis vel consectetur. Ut neque est, sagittis a erat non, pretium convallis neque. Duis rhoncus neque leo, ac posuere erat blandit a. Nunc tempor ipsum eget lectus sollicitudin, in porta erat luctus. Quisque ac fringilla massa, ut egestas diam. Praesent ut erat odio.\n\nMorbi eleifend et felis nec maximus. Mauris et nisl viverra arcu vestibulum ultricies sed ac mauris. Quisque facilisis lorem a orci iaculis, quis vehicula urna tempor. Phasellus sapien nunc, efficitur eu tincidunt id, elementum vitae magna. Vivamus in elementum metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc eget faucibus ipsum. Nulla elementum risus sapien, ac tempor est varius ac. Duis sodales, mauris at accumsan varius, lorem purus aliquam mi, a tempor elit erat quis nisl. Pellentesque tempor sollicitudin risus, non condimentum ex ullamcorper et. Vivamus dignissim consectetur elit, in iaculis nulla fermentum vitae. Maecenas dictum eu purus at tincidunt. Integer posuere elit erat, ac finibus libero tristique nec. Morbi id viverra nulla.\n\nSuspendisse velit massa, fringilla id lorem et, feugiat blandit arcu. Morbi nulla diam, cursus eget dui vitae, condimentum tempus quam. Cras placerat dapibus lorem, eget porta sem varius quis. Curabitur at vestibulum magna. Sed scelerisque elit semper magna iaculis varius. Curabitur pulvinar eros odio, efficitur bibendum risus iaculis non. Sed interdum enim pellentesque laoreet consectetur. Nam sed consequat neque. Maecenas lectus metus, condimentum pharetra mauris in, dapibus mollis enim. Suspendisse nec nulla porttitor, ornare mauris in, lobortis libero. Pellentesque rhoncus, quam ac venenatis fringilla, urna mi tristique dui, sit amet ultricies leo mauris posuere eros. Vestibulum id erat augue. Fusce quis quam quis mi commodo scelerisque. Morbi a massa sit amet nunc viverra fringilla sit amet eget risus.\n    ";
        //DEMONSTRATION VARIABLE ONLY DELETE FOR RELEASE
        this.testLongCode = "\n/*\n * C Program To Identify the Missing Number in an Integer \n * Array of Size N-1 with Numbers[1,N]\n */\n#include <stdio.h>\n#define MAX 15\nint missing_number_array(int [],int);\n \nint main()\n{\n    int a[MAX], num, i, n;\n \n    printf(\"enter the range of array&bsol;n\");\n    scanf(\"%d\", &n);\n    for (i = 0;i < n;i++)\n    {\n        printf(\"enter a[%d]element into the array:\", i);\n        scanf(\"%d\", &a[i]);\n    }\n    num = missing_number_array(a, n);\n    printf(\"The missing number -> %d\n\", num);\n}\n \n/* To find the missing number in array */\nint missing_number_array(int a[],  int n)\n{\n    int i;\n    int s1 = 0; \n    int s2 = 0; \n \n    for (i = 0;i < n;i++)\n        s1 = s1 ^ a[i];\n    for (i = 1;i <= n + 1;i++)\n        s2 = s2 ^ i; \n    return (s1 ^ s2);\n}\n    ";
        //relevant variables for binding in DOM
        this.submission = new submission_1.Submission();
        this.student = new student_1.Student();
        this.exercise = new exercise_1.Exercise();
        this.exam = new exam_1.Exam();
        this.codeLanguage = "";
        this.comment = "";
        this.criteria = new Array();
        this.codeString = "";
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
        this.comment = data.comment;
        this.codeString = data.code;
        this.codeElement.nativeElement.textContent = this.testLongCode;
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
        return num * 100 / gama;
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
            var subGrade = s.grade;
            //ignore this error
            grade += (parseInt(subGrade) * s.criteria.weight * 0.01);
        }
        return (grade < 0) ? 0 : grade;
    };
    /**
     * Auxiliary function to grade from list of criteria
     * @param subCriteria- Array of criteria
     * @returns percentage value for total grade given weights
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
        if (this.existsUngraded) {
            this._router.navigate(['/examiner/dashboard']);
        }
        else {
            this.saveEvaluation();
            this._router.navigate(['/examiner/dashboard']);
        }
    };
    /**
     * Auxiliary function to help determine witch option to select
     */
    WorkstationComponent.prototype.select = function (num, grade) {
        return num === parseInt(grade);
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
        __metadata('design:paramtypes', [router_1.Router, submission_service_1.SubmissionService, router_1.ActivatedRoute, exam_service_1.ExamService, auth_service_1.AuthService])
    ], WorkstationComponent);
    return WorkstationComponent;
}());
exports.WorkstationComponent = WorkstationComponent;
//# sourceMappingURL=workstation.component.js.map