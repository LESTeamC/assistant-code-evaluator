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
var login_service_1 = require('./login.service');
var auth_service_1 = require('./../shared/auth.service');
var LoginComponent = (function () {
    function LoginComponent(_router, _authService, loginService) {
        this._router = _router;
        this._authService = _authService;
        this.loginService = loginService;
        this.login = new credentials_1.Credentials('', '');
        this.errorMessage = "";
    }
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loginService.login(this.login.username, this.login.password)
            .subscribe(function (data) { return _this.loginSuccess(data); }, function (error) { return _this.loginFail(error); });
        this.login.password = "";
        this.login.username = "";
    };
    LoginComponent.prototype.loginSuccess = function (data) {
        this._authService.setCredentials(this.login);
        this._authService.login("examiner");
        this.errorMessage = "";
        this._router.navigate(['/examiner/dashboard']);
    };
    LoginComponent.prototype.loginFail = function (error) {
        if (error.status === 401) {
            this.errorMessage = "Invalid Credentials.";
        }
        else if (error.status === 403) {
            this.errorMessage = "You don't have permission to access this feature.";
        }
        else {
            this.errorMessage = "Could not connect to server. Try again later.";
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: '/app/login/login.component.html',
            styleUrls: ['app/login/login.component.css'],
        }), 
        __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthService, login_service_1.LoginService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map