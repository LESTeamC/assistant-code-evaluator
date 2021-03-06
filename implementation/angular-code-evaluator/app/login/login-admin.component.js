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
var LoginAdminComponent = (function () {
    function LoginAdminComponent(_router, _authService, loginService) {
        this._router = _router;
        this._authService = _authService;
        this.loginService = loginService;
        this.login = new credentials_1.Credentials('', '');
        this.errorMessage = "";
    }
    /**
     * Submits credetials to API to determine if valid or not;
     */
    LoginAdminComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loginService.loginAdmin(this.login.username, this.login.password)
            .subscribe(function (data) { return _this.loginSuccess(data); }, function (error) { return _this.loginFail(error); });
    };
    /**
     * Success Funtion
     * Sets Credentials in shared service for other components to use
     * Cleans error messages and navigates to admin dashboard
     * @param: Account returned from API
     */
    LoginAdminComponent.prototype.loginSuccess = function (data) {
        this._authService.setCredentials(this.login);
        this._authService.login(this.login, "admin");
        this.errorMessage = "";
        this._router.navigate(['/admin/view-exams']);
    };
    /**
     * Fail Funtion
     * If error ir 401 (Unauthorized), tells user about invalid credentials.
     * If error ir 403 (Forbidden), it's because user exists and PW is correct, but is not allowed in module
     * Else, generic error message
     * @param: error object
     */
    LoginAdminComponent.prototype.loginFail = function (error) {
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
    LoginAdminComponent = __decorate([
        core_1.Component({
            selector: 'login-admin',
            templateUrl: '/app/login/login-admin.component.html',
            styleUrls: ['app/login/login.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthService, login_service_1.LoginService])
    ], LoginAdminComponent);
    return LoginAdminComponent;
}());
exports.LoginAdminComponent = LoginAdminComponent;
//# sourceMappingURL=login-admin.component.js.map