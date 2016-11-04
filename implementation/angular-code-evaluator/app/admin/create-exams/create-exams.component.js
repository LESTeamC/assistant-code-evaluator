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
var CreateExamsComponent = (function () {
    function CreateExamsComponent(_router) {
        this._router = _router;
    }
    CreateExamsComponent.prototype.ngOnInit = function () {
        console.log("create exams");
    };
    CreateExamsComponent = __decorate([
        core_1.Component({
            selector: 'create-exam',
            templateUrl: 'app/admin/create-exams/create-exams.component.html',
            styleUrls: ['app/admin/create-exams/create-exams.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], CreateExamsComponent);
    return CreateExamsComponent;
}());
exports.CreateExamsComponent = CreateExamsComponent;
//# sourceMappingURL=create-exams.component.js.map