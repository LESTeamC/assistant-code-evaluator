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
var exercise_criteria_1 = require('./../../model/exercise-criteria');
var exam_service_1 = require('./../exam.service');
var csv_service_1 = require('./csv.service');
var CreateExamsComponent = (function () {
    function CreateExamsComponent(_router, examService, csvService) {
        this._router = _router;
        this.examService = examService;
        this.csvService = csvService;
        //Objects to use in Model and leter persist in Database (exam, exercises and criteria)
        this.exam = new exam_1.Exam();
        this.exercises = new Array();
        this.criteria = new Array();
        this.students = new Array();
        //Placeholder objects to use wile user is creating exercise
        this.currentExercise = new exercise_1.Exercise();
        this.currentCriteria = new exercise_criteria_1.ExerciseCriteria();
    }
    CreateExamsComponent.prototype.ngOnInit = function () {
        //Initialize variables with FALSE on Init.
        this.serverError = false;
        this.conflictError = false;
        this.conflictErrorExercise = false;
        this.createdSuccess = false;
        this.weightErrorCriteria = false;
        this.weightErrorExercise = false;
    };
    /**
     * Submission funtion. Add created exercises to Exam and POST on server
     */
    CreateExamsComponent.prototype.onSubmit = function () {
        var _this = this;
        this.exam.exercises = this.exercises;
        this.exam.students = this.students;
        this.examService.createExam(this.exam)
            .subscribe(function (data) { return _this.successCreate(data); }, function (error) { return _this.failCreate(error); });
    };
    /**
     * Success Funtion. Restart variables and display success message
     * @param: Exam returned by server (created exam)
     */
    CreateExamsComponent.prototype.successCreate = function (exam) {
        console.log("Exam Created successfully");
        this.conflictError = false;
        this.serverError = false;
        this.lastExamName = exam.name;
        this.createdSuccess = true;
        this.exam = new exam_1.Exam();
        this.exercises = new Array();
        this.students = new Array();
    };
    /**
     * Failure funtion.
     * If error status is 409 (CONFLICT), it means there is already an exam with the same name.
     * Else, show a generic error message.
     * @param error object returned by API
     */
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
        }
    };
    /**
     * Adds exercise to list of created exercises
     * Checks if name already exists;
     * Checks if weight exceeds 100
     */
    CreateExamsComponent.prototype.addExercise = function () {
        if (this.hasName(this.exercises, this.currentExercise.name) >= 0) {
            this.weightErrorExercise = false;
            this.weightErrorCriteria = false;
            this.conflictErrorExercise = true;
        }
        else if (this.calcTotalWeight(this.exercises) + this.currentExercise.weight > 100) {
            this.conflictErrorExercise = false;
            this.weightErrorCriteria = false;
            this.weightErrorExercise = true;
        }
        else {
            this.currentExercise.criteria = this.criteria;
            this.exercises.push(this.currentExercise);
            this.currentExercise = new exercise_1.Exercise();
            this.currentCriteria = new exercise_criteria_1.ExerciseCriteria();
            this.criteria = new Array(),
                this.weightErrorExercise = false;
            this.conflictErrorExercise = false;
            this.weightErrorCriteria = false;
            this.hideChildModal();
        }
    };
    /**
     * Deletes Exercise from list
     * @param: exercise to delete;
     */
    CreateExamsComponent.prototype.deleteExercise = function (exercise) {
        var index = this.exercises.indexOf(exercise);
        if (index > -1) {
            this.exercises.splice(index, 1);
        }
    };
    /**
     * Adds criteria to list;
     * Checks if total weight exceeds 100
     */
    CreateExamsComponent.prototype.addCriteria = function () {
        if (this.calcTotalWeight(this.criteria) + this.currentCriteria.weight > 100) {
            this.conflictErrorExercise = false;
            this.weightErrorExercise = false;
            this.weightErrorCriteria = true;
        }
        else {
            this.criteria.push(this.currentCriteria);
            this.currentCriteria = new exercise_criteria_1.ExerciseCriteria();
        }
    };
    /**
     * Deletes criteria from list
     * @param: criteria to delete
     */
    CreateExamsComponent.prototype.deleteCriteria = function (criteria) {
        var index = this.criteria.indexOf(criteria);
        if (index > -1) {
            this.criteria.splice(index, 1);
        }
    };
    /**
     * Checks if a list of exercises has an object with a given name value
     * @param: list of exercises
     * @param: string name
     * @returns: -1 if false, the index if true
     */
    CreateExamsComponent.prototype.hasName = function (list, name) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].name === name) {
                return i; //Returns element position, so it exists
            }
        }
        return -1; //The element isn't in your array
    };
    ;
    /**
     * Calculates total weight value of a list of execises
     * @param: list of exercises
     * @returns: total weight value
     */
    CreateExamsComponent.prototype.calcTotalWeight = function (list) {
        var i;
        var sum = 0;
        for (i = 0; i < list.length; i++) {
            sum += list[i].weight;
        }
        return sum; //The element isn't in your array
    };
    ;
    /**
     * Calculates total weight value of a list of criteria
     * @param: list of criteria
     * @returns: total weight value
     */
    CreateExamsComponent.prototype.calcTotalWeightCriteria = function (list) {
        var i;
        var sum = 0;
        for (i = 0; i < list.length; i++) {
            sum += list[i].weight;
        }
        return sum; //The element isn't in your array
    };
    ;
    CreateExamsComponent.prototype.uploadCSV = function ($event) {
        var _this = this;
        var file = $event.target.files[0];
        var subscription = this.csvService.getStudentsFromCSV(file)
            .subscribe(function (data) { return _this.students = data; });
    };
    /**
    * Shows modal
    */
    CreateExamsComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    /**
     * Hides modal
     */
    CreateExamsComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    __decorate([
        core_1.ViewChild('exerciseModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], CreateExamsComponent.prototype, "childModal", void 0);
    CreateExamsComponent = __decorate([
        core_1.Component({
            selector: 'create-exam',
            templateUrl: 'app/admin/create-exams/create-exams.component.html',
            styleUrls: ['app/admin/create-exams/create-exams.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, exam_service_1.ExamService, csv_service_1.CSVService])
    ], CreateExamsComponent);
    return CreateExamsComponent;
}());
exports.CreateExamsComponent = CreateExamsComponent;
//# sourceMappingURL=create-exams.component.js.map