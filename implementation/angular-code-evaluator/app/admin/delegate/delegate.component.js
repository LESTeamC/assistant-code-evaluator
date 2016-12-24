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
var exercise_1 = require('./../../model/exercise');
var examiner_service_1 = require('./../../shared/examiner.service');
var exercise_service_1 = require('./../../shared/exercise.service');
var DelegateComponent = (function () {
    function DelegateComponent(_router, examinerService, exerciseService) {
        this._router = _router;
        this.examinerService = examinerService;
        this.exerciseService = exerciseService;
        this.exercises = new Array();
        this.selectedExercise = new exercise_1.Exercise();
        this.selectedExaminer = null;
        this.selectedExaminerModal = null;
        //Alert variables
        this.successDelegation = false;
        this.successUndelegation = false;
        this.failedDelegation = false;
    }
    DelegateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.examinerService.getExaminers()
            .subscribe(function (data) { return _this.successGetExaminers(data); }, function (error) { return _this.failGetExaminers(error); });
        this.exerciseService.getOpenExercises()
            .subscribe(function (data) { return _this.successGetExercises(data); }, function (error) { return _this.failGetExercises(error); });
    };
    DelegateComponent.prototype.successGetExaminers = function (data) {
        this.examiners = data;
    };
    DelegateComponent.prototype.failGetExaminers = function (error) {
        this._router.navigate(['/loginadmin']);
    };
    DelegateComponent.prototype.successGetExercises = function (data) {
        this.exercises = data;
    };
    DelegateComponent.prototype.failGetExercises = function (error) {
        this._router.navigate(['/loginadmin']);
    };
    DelegateComponent.prototype.successDelegate = function (data) {
        var _this = this;
        this.exercises.find(function (d) { return d.id === _this.selectedExercise.id; }).examiner = this.selectedExaminerModal;
        this.lastDelegatedExercise = data;
        if (!data.examiner) {
            this.successDelegation = false;
            this.failedDelegation = false;
            this.successUndelegation = true;
        }
        else {
            this.successUndelegation = false;
            this.failedDelegation = false;
            this.successDelegation = true;
        }
    };
    DelegateComponent.prototype.failDelegate = function (data) {
        this.successUndelegation = false;
        this.successDelegation = false;
        this.failedDelegation = true;
    };
    DelegateComponent.prototype.isSelected = function (id) {
        return id === this.selectedExercise.id;
    };
    DelegateComponent.prototype.selectRow = function (exercise) {
        this.selectedExercise = exercise;
        this.selectedExaminer = exercise.examiner;
        this.selectedExaminerModal = null;
    };
    DelegateComponent.prototype.selectExaminer = function () {
        var _this = this;
        this.hideChildModal();
        this.selectedExaminerModal = (this.selectedExaminerModal === "null") ? null : this.selectedExaminerModal;
        var examinerId = (this.selectedExaminerModal === null) ? undefined : this.selectedExaminerModal.id;
        this.exerciseService.delegateExercise(this.selectedExercise.id, examinerId)
            .subscribe(function (data) { return _this.successDelegate(data); }, function (error) { return _this.failDelegate(error); });
    };
    DelegateComponent.prototype.isSelectedExaminer = function (examiner) {
        if (examiner === null || this.selectedExaminer === null)
            return false;
        return examiner.name === this.selectedExaminer.name;
    };
    /**
    * Shows modal
    */
    DelegateComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    /**
     * Hides modal
     */
    DelegateComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    __decorate([
        core_1.ViewChild('examinerModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], DelegateComponent.prototype, "childModal", void 0);
    DelegateComponent = __decorate([
        core_1.Component({
            selector: 'delegate',
            templateUrl: "app/admin/delegate/delegate.component.html",
            styleUrls: ['app/admin/delegate/delegate.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, examiner_service_1.ExaminerService, exercise_service_1.ExerciseService])
    ], DelegateComponent);
    return DelegateComponent;
}());
exports.DelegateComponent = DelegateComponent;
//# sourceMappingURL=delegate.component.js.map