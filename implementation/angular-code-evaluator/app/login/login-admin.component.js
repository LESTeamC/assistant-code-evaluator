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
var credentials_1 = require('./../model/credentials');
var LoginAdminComponent = (function () {
    function LoginAdminComponent(_router) {
        this._router = _router;
        this.login = new credentials_1.Credentials('', '');
    }
    LoginAdminComponent.prototype.onSubmit = function () {
        console.log(this.login);
        this._router.navigate(['/admin/view-exams']);
    };
    LoginAdminComponent = __decorate([
        core_1.Component({
            selector: 'login-admin',
            templateUrl: '/app/login/login-admin.component.html',
            styleUrls: ['app/login/login.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], LoginAdminComponent);
    return LoginAdminComponent;
}());
exports.LoginAdminComponent = LoginAdminComponent;
//# sourceMappingURL=login-admin.component.js.map