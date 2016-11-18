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
var DashboardComponent = (function () {
    function DashboardComponent(_router, authService) {
        this._router = _router;
        this.authService = authService;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.header = this.authService.credentials;
        console.log(this.header);
    };
    DashboardComponent.prototype.onSelect = function () {
        //navigate passing the submission ID!
        this._router.navigate(['/examiner/workstation', 1]);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'admin',
            template: "<h1>DASHBOARD</h1>\n    <button class=\"btn\" (click)=\"onSelect(submission)\"></button>",
        }), 
        __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map