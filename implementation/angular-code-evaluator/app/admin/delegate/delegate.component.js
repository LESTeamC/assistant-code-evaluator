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
var examiner_service_1 = require('./../../shared/examiner.service');
var exercise_service_1 = require('./../../shared/exercise.service');
var DelegateComponent = (function () {
    function DelegateComponent(_router, examinerService, exerciseService) {
        this._router = _router;
        this.examinerService = examinerService;
        this.exerciseService = exerciseService;
    }
    DelegateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.examinerService.getExaminers()
            .subscribe(function (data) { return _this.successGetExaminers(data); }, function (error) { return _this.failGetExaminers(error); });
        this.exerciseService.getExercises()
            .subscribe(function (data) { return _this.successGetExercises(data); }, function (error) { return _this.failGetExercises(error); });
    };
    DelegateComponent.prototype.successGetExaminers = function (data) {
        this.examiners = data;
    };
    DelegateComponent.prototype.failGetExaminers = function (error) {
    };
    DelegateComponent.prototype.successGetExercises = function (data) {
        this.exercises = data;
        console.log(data);
    };
    DelegateComponent.prototype.failGetExercises = function (error) {
    };
    DelegateComponent = __decorate([
        core_1.Component({
            selector: 'delegate',
            templateUrl: "app/admin/delegate/delegate.component.html",
        }), 
        __metadata('design:paramtypes', [router_1.Router, examiner_service_1.ExaminerService, exercise_service_1.ExerciseService])
    ], DelegateComponent);
    return DelegateComponent;
}());
exports.DelegateComponent = DelegateComponent;
//# sourceMappingURL=delegate.component.js.map