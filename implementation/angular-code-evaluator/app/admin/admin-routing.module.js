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
var admin_component_1 = require('./admin.component');
var create_exams_component_1 = require('./create-exams/create-exams.component');
var create_examiners_component_1 = require('./create-examiners/create-examiners.component');
var delegate_component_1 = require('./delegate/delegate.component');
var global_view_component_1 = require('./global-view/global-view.component');
var view_exams_component_1 = require('./view-exams/view-exams.component');
var view_examiners_component_1 = require('./view-examiners/view-examiners.component');
var import_submission_component_1 = require('./view-exams/import-submission.component');
var auth_guard_service_1 = require('./../shared/auth-guard.service');
var AdminRoutingModule = (function () {
    function AdminRoutingModule() {
    }
    AdminRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild([
                    {
                        path: '',
                        component: admin_component_1.AdminComponent,
                        canActivateChild: [auth_guard_service_1.AuthGuard],
                        children: [
                            {
                                path: 'view-exams',
                                component: view_exams_component_1.ViewExamsComponent,
                            },
                            {
                                path: 'create-exams',
                                component: create_exams_component_1.CreateExamsComponent,
                            },
                            {
                                path: 'create-examiners',
                                component: create_examiners_component_1.CreateExaminersComponent,
                            },
                            {
                                path: 'delegate',
                                component: delegate_component_1.DelegateComponent,
                            },
                            {
                                path: 'global-view/:id',
                                component: global_view_component_1.GlobalViewComponent,
                            },
                            {
                                path: 'view-exams',
                                component: view_exams_component_1.ViewExamsComponent,
                            },
                            {
                                path: 'view-examiners',
                                component: view_examiners_component_1.ViewExaminersComponent,
                            },
                            {
                                path: 'import-submission',
                                component: import_submission_component_1.ImportSubmissionComponent,
                            },
                        ]
                    }
                ])
            ],
            exports: [
                router_1.RouterModule
            ],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], AdminRoutingModule);
    return AdminRoutingModule;
}());
exports.AdminRoutingModule = AdminRoutingModule;
//# sourceMappingURL=admin-routing.module.js.map