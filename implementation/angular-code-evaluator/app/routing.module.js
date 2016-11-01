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
var app_component_1 = require('./app.component');
var login_component_1 = require('./login/login.component');
var login_admin_component_1 = require('./login/login-admin.component');
var RoutingModule = (function () {
    function RoutingModule() {
    }
    RoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot([
                    { path: '', component: app_component_1.AppComponent, data: { title: '' } },
                    { path: 'login', component: login_component_1.LoginComponent, data: { title: 'Login' } },
                    { path: 'loginadmin', component: login_admin_component_1.LoginAdminComponent, data: { title: 'LoginAdmin' } },
                    { path: 'admin',
                        loadChildren: 'app/admin/admin.module#AdminModule',
                    },
                    { path: 'examiner',
                        loadChildren: 'app/examiner/examiner.module#ExaminerModule',
                    },
                    { path: '**', component: login_component_1.LoginComponent }
                ])
            ],
            exports: [
                router_1.RouterModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], RoutingModule);
    return RoutingModule;
}());
exports.RoutingModule = RoutingModule;
//# sourceMappingURL=routing.module.js.map