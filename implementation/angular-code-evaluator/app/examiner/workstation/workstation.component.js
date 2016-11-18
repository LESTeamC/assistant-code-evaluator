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
var submission_service_1 = require('./../submission.service');
var WorkstationComponent = (function () {
    function WorkstationComponent(_router, submissionService, activatedRoute) {
        this._router = _router;
        this.submissionService = submissionService;
        this.activatedRoute = activatedRoute;
        this.submission = new submission_1.Submission();
        this.criteria = new Array();
        this.code = this.submission.code;
    }
    WorkstationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params
            .switchMap(function (params) { return _this.submissionService.getSubmission(+params['id']); })
            .subscribe(function (data) { return _this.success(data); }, function (error) { return _this.fail(error); });
    };
    WorkstationComponent.prototype.success = function (data) {
        this.submission = data;
        this.criteria = data.criteria;
    };
    WorkstationComponent.prototype.fail = function (error) {
        this._router.navigate(['/examiner/dashboard']);
    };
    WorkstationComponent.prototype.createArray = function (num) {
        var array = Array.from(Array(num), function (x, i) { return i; });
        console.log(array);
        return array;
    };
    WorkstationComponent = __decorate([
        core_1.Component({
            selector: 'workstation',
            templateUrl: '/app/examiner/workstation/workstation.component.html',
            styleUrls: ['app/examiner/workstation/workstation.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, submission_service_1.SubmissionService, router_1.ActivatedRoute])
    ], WorkstationComponent);
    return WorkstationComponent;
}());
exports.WorkstationComponent = WorkstationComponent;
//# sourceMappingURL=workstation.component.js.map