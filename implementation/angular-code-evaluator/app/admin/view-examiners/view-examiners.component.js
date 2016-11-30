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
var examiner_1 = require('./../../model/examiner');
var examiner_service_1 = require('./../../shared/examiner.service');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var ViewExaminersComponent = (function () {
    function ViewExaminersComponent(_router, examinerService) {
        this._router = _router;
        this.examinerService = examinerService;
        this.examiners = new Array();
        this.selectedExaminerModal = null;
        this.selectedExaminer = new examiner_1.Examiner();
        this.deleteSuccess = false;
        this.deleteError = false;
        this.messageDelete = '';
    }
    ViewExaminersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.examinerService.getExaminers()
            .subscribe(function (data) { return _this.successGetExaminers(data); }, function (error) { return _this.failGetExaminers(error); });
    };
    ViewExaminersComponent.prototype.isSelected = function (id) {
        return id === this.selectedExaminer.id;
    };
    ViewExaminersComponent.prototype.selectRow = function (examiner) {
        this.selectedExaminer = examiner;
    };
    ViewExaminersComponent.prototype.successGetExaminers = function (data) {
        this.examiners = data;
    };
    ViewExaminersComponent.prototype.failGetExaminers = function (error) {
        this._router.navigate(['/loginadmin']);
    };
    ViewExaminersComponent.prototype.deleteExaminer = function () {
        var _this = this;
        this.hideChildModal();
        this.examinerService.deleteExaminer(this.selectedExaminer.id)
            .subscribe(function (data) { return _this.successDelete(data); }, function (error) { return _this.failDelete(error); });
    };
    ViewExaminersComponent.prototype.successDelete = function (data) {
        this.examiners = this.removeFromArray(this.examiners, this.selectedExaminer.id);
        this.selectedExaminer = new examiner_1.Examiner();
        this.deleteError = false;
        this.deleteSuccess = true;
        console.log(data);
    };
    ViewExaminersComponent.prototype.failDelete = function (error) {
        this.deleteSuccess = false;
        this.deleteError = true;
        console.log(error);
    };
    ViewExaminersComponent.prototype.removeFromArray = function (array, id) {
        return array.filter(function (el) {
            return el.id !== id;
        });
    };
    /**
    * Shows modal
    */
    ViewExaminersComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    /**
     * Hides modal
     */
    ViewExaminersComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    __decorate([
        core_1.ViewChild('deleteModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], ViewExaminersComponent.prototype, "childModal", void 0);
    ViewExaminersComponent = __decorate([
        core_1.Component({
            selector: 'admin',
            templateUrl: "app/admin/view-examiners/view-examiners.component.html",
            styleUrls: ['app/admin/view-examiners/view-examiners.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, examiner_service_1.ExaminerService])
    ], ViewExaminersComponent);
    return ViewExaminersComponent;
}());
exports.ViewExaminersComponent = ViewExaminersComponent;
//# sourceMappingURL=view-examiners.component.js.map