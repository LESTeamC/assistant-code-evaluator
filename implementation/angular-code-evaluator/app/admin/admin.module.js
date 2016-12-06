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
var import_submission_component_1 = require('./view-exams/import-submission.component');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var exam_service_1 = require('./exam.service');
var examiner_service_1 = require('./../shared/examiner.service');
var exercise_service_1 = require('./../shared/exercise.service');
var csv_service_1 = require('./csv.service');
var upload_service_1 = require('./upload.service');
var zip_service_1 = require('./zip.service');
var status_pipe_1 = require('./../shared/status.pipe');
var orderby_pipe_1 = require('./view-exams/orderby.pipe');
var AdminModule = (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                admin_routing_module_1.AdminRoutingModule,
                ng2_bootstrap_1.ModalModule,
                ng2_bootstrap_1.DatepickerModule,
                ng2_bootstrap_1.AlertModule
            ],
            declarations: [
                admin_component_1.AdminComponent,
                create_exams_component_1.CreateExamsComponent,
                create_examiners_component_1.CreateExaminersComponent,
                view_exams_component_1.ViewExamsComponent,
                view_examiners_component_1.ViewExaminersComponent,
                global_view_component_1.GlobalViewComponent,
                delegate_component_1.DelegateComponent,
                import_submission_component_1.ImportSubmissionComponent,
                status_pipe_1.StatusPipe,
                orderby_pipe_1.OrderByPipe
            ],
            providers: [
                exam_service_1.ExamService,
                examiner_service_1.ExaminerService,
                exercise_service_1.ExerciseService,
                csv_service_1.CSVService,
                upload_service_1.UploadService,
                zip_service_1.ZipService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map