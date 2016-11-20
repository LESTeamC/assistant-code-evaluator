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
var ViewExamsComponent = (function () {
    function ViewExamsComponent(_router) {
        this._router = _router;
        this.messageEdit = '';
        this.messageDelete = '';
        this.messageExport = '';
        this.messageGlobal = '';
        this.messageImport = '';
    }
    ViewExamsComponent.prototype.ngOnInit = function () {
        console.log("view exams");
    };
    ViewExamsComponent.prototype.editExams = function () {
        this.messageEdit = 'Go to edit exams page!';
    };
    ViewExamsComponent.prototype.deleteExams = function () {
        this.messageDelete = 'are u sure?';
    };
    ViewExamsComponent.prototype.exportGrade = function () {
        this.messageExport = 'Go to export page!';
    };
    ViewExamsComponent.prototype.visionGlobal = function () {
        this.messageGlobal = 'Go to global view page!';
    };
    ViewExamsComponent.prototype.importSubmission = function () {
        this.messageImport = 'Go to import page!';
    };
    ViewExamsComponent = __decorate([
        core_1.Component({
            //selector: 'admin',	
            selector: 'view-exams',
            templateUrl: 'app/admin/view-exams/view-exams.component.html',
            styleUrls: ['app/admin/view-exams/view-exams.component.css'],
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], ViewExamsComponent);
    return ViewExamsComponent;
}());
exports.ViewExamsComponent = ViewExamsComponent;
//# sourceMappingURL=view-exams.component.js.map