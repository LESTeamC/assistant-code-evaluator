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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var examiner_router_module_1 = require('./examiner-router.module');
var examiner_component_1 = require('./examiner.component');
var dashboard_component_1 = require('./dashboard/dashboard.component');
var workstation_component_1 = require('./workstation/workstation.component');
var code_component_1 = require('./workstation/code.component');
var examiner_service_1 = require('./../shared/examiner.service');
var ExaminerModule = (function () {
    function ExaminerModule() {
    }
    ExaminerModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                examiner_router_module_1.ExaminerRoutingModule
            ],
            declarations: [
                dashboard_component_1.DashboardComponent,
                workstation_component_1.WorkstationComponent,
                examiner_component_1.ExaminerComponent,
                code_component_1.CodeComponent,
            ],
            providers: [
                examiner_service_1.ExaminerService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ExaminerModule);
    return ExaminerModule;
}());
exports.ExaminerModule = ExaminerModule;
//# sourceMappingURL=examiner.module.js.map