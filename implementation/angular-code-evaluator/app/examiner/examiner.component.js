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
var auth_service_1 = require('./../shared/auth.service');
var examiner_service_1 = require('./examiner.service');
var examiner_1 = require('./../model/examiner');
var ExaminerComponent = (function () {
    function ExaminerComponent(_router, authService, examinerService) {
        this._router = _router;
        this.authService = authService;
        this.examinerService = examinerService;
        this.examiner = new examiner_1.Examiner();
    }
    ExaminerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.examinerUsername = this.authService.username;
        this.examinerService.getExaminer(this.examinerUsername)
            .subscribe(function (data) { return _this.success(data); }, function (error) { return _this.fail(error); });
    };
    ExaminerComponent.prototype.success = function (data) {
        this.examiner = data;
    };
    ExaminerComponent.prototype.fail = function (error) {
        this._router.navigate(['/login']);
    };
    ExaminerComponent = __decorate([
        core_1.Component({
            selector: 'examiner',
            templateUrl: '/app/examiner/examiner.component.html',
            styleUrls: ['app/examiner/examiner.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthService, examiner_service_1.ExaminerService])
    ], ExaminerComponent);
    return ExaminerComponent;
}());
exports.ExaminerComponent = ExaminerComponent;
//# sourceMappingURL=examiner.component.js.map