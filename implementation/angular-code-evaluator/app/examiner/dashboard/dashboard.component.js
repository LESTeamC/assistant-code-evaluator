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
var auth_service_1 = require('./../../shared/auth.service');
var examiner_service_1 = require('./../../shared/examiner.service');
var examiner_1 = require('./../../model/examiner');
var navigation_service_1 = require('./../navigation.service');
var DashboardComponent = (function () {
    function DashboardComponent(_router, authService, examinerService, navigationService) {
        this._router = _router;
        this.authService = authService;
        this.examinerService = examinerService;
        this.navigationService = navigationService;
        this.selectedRow = -1;
        this.examiner = new examiner_1.Examiner();
        this.oldStatus = "All";
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.header = this.authService.credentials;
        this.examinerUsername = this.authService.username;
        this.examinerService.getExaminer(this.examinerUsername)
            .subscribe(function (data) { return _this.setExaminer(data); }, function (error) { return _this.fail(error); });
        this.examinerService.getExercisesByExaminer(this.authService.username).subscribe(function (data) { return _this.successGetExercisesByExam(data); }, function (error) { return _this.fail(error); });
    };
    DashboardComponent.prototype.ngAfterViewInit = function () {
        this.updateMessage();
    };
    DashboardComponent.prototype.updateMessage = function () {
        //this.exercise = [];
    };
    DashboardComponent.prototype.successGetExercisesByExam = function (data) {
        var _this = this;
        this.setExercises(data);
        console.log("Golo!");
        this.examinerService.getSubmissionsByExercise(this.exercises[0].id).subscribe(function (data) { return _this.successGetSubmissionsByExercise(data); }, function (error) { return _this.fail(error); });
    };
    DashboardComponent.prototype.successGetSubmissionsByExercise = function (data) {
        this.submissions = data;
    };
    DashboardComponent.prototype.setExercises = function (data) {
        this.exercises = data;
        this.nonfilteredExercises = this.exercises.slice();
    };
    DashboardComponent.prototype.isSelected = function (id) {
        return id === this.selectedRow;
    };
    DashboardComponent.prototype.filterByStatus = function (status) {
        //validate input
        if (this.oldStatus == null || this.oldStatus == status) {
            this.oldStatus = status;
            return;
        }
        if (status == "All") {
            this.exercises = this.nonfilteredExercises.slice();
            return;
        }
        // clean list
        this.exercises = [];
        var arrayLength = this.nonfilteredExercises.length;
        for (var i = 0; i < arrayLength; i++) {
            if (this.nonfilteredExercises[i].status === status) {
                this.exercises.push(this.nonfilteredExercises[i]);
            }
        }
        this.oldStatus = status;
    };
    DashboardComponent.prototype.filterByDegree = function (value) {
        //validate input
        if (value == null || !value) {
            this.exercises = this.nonfilteredExercises.slice();
            return;
        }
        // clean list
        this.exercises = [];
        var arrayLength = this.nonfilteredExercises.length;
        for (var i = 0; i < arrayLength; i++) {
            if (this.nonfilteredExercises[i].exam.degree.toUpperCase().indexOf(value.toUpperCase()) !== -1) {
                // add the exercise that contais the degree entered by the user
                this.exercises.push(this.nonfilteredExercises[i]);
            }
        }
    };
    DashboardComponent.prototype.selectRow = function (id) {
        var _this = this;
        this.examinerService.getSubmissionsByExercise(id).subscribe(function (data) { return _this.successGetSubmissionsByExercise(data); }, function (error) { return _this.fail(error); });
    };
    DashboardComponent.prototype.fail = function (error) {
        this._router.navigate(['/loginadmin']);
        console.log("Fail");
    };
    DashboardComponent.prototype.setExaminer = function (data) {
        this.examiner = data;
    };
    DashboardComponent.prototype.createIndexArray = function (array) {
        var indexArray = new Array();
        var elem;
        for (elem in array) {
            indexArray.push(elem.id);
        }
        return indexArray;
    };
    DashboardComponent.prototype.onSelect = function (submission) {
        //JUST FOR TESTING THE WORKSTATION SCREEN
        this.navigationService.buildService([1], 1);
        this._router.navigate(['/examiner/workstation', 1]);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            templateUrl: "app/examiner/dashboard/dashboard.component.html",
            styleUrls: ['app/examiner/dashboard/dashboard.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthService, examiner_service_1.ExaminerService, navigation_service_1.NavigationService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map