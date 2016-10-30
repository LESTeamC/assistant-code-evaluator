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
var admin_component_1 = require('./admin.component');
var admin_routing_module_1 = require('./admin-routing.module');
var create_exams_component_1 = require('./create-exams/create-exams.component');
var create_examiners_component_1 = require('./create-examiners/create-examiners.component');
var delegate_component_1 = require('./delegate/delegate.component');
var global_view_component_1 = require('./global-view/global-view.component');
var view_examiners_component_1 = require('./view-examiners/view-examiners.component');
var view_exams_component_1 = require('./view-exams/view-exams.component');
var AdminModule = (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                admin_routing_module_1.AdminRoutingModule
            ],
            declarations: [
                admin_component_1.AdminComponent,
                create_exams_component_1.CreateExamsComponent,
                create_examiners_component_1.CreateExaminersComponent,
                view_exams_component_1.ViewExamsComponent,
                view_examiners_component_1.ViewExaminersComponent,
                global_view_component_1.GlobalViewComponent,
                delegate_component_1.DelegateComponent,
            ],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map