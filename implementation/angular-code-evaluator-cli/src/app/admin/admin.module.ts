import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component'
import { AdminRoutingModule } from './admin-routing.module'

import { CreateExamsComponent } from './create-exams/create-exams.component'
import { CreateExaminersComponent } from './create-examiners/create-examiners.component'
import { DelegateComponent } from './delegate/delegate.component'
import { GlobalViewComponent } from './global-view/global-view.component'
import { ViewExaminersComponent } from './view-examiners/view-examiners.component'
import { ViewExamsComponent } from './view-exams/view-exams.component'
import { ImportSubmissionComponent } from './view-exams/import-submission.component'
import { EditExamComponent } from './edit-exam/edit-exam.component'
import { EditExaminerComponent } from './edit-examiner/edit-examiner.component'

import { ModalModule, AlertModule, DatepickerModule, AccordionModule } from 'ng2-bootstrap/ng2-bootstrap';

import { ExamService } from './exam.service'
import { ExaminerService } from './../shared/examiner.service'
import { ExerciseService } from './../shared/exercise.service'
import { CSVService } from './csv.service'
import { UploadService } from './upload.service'
import { ZipService } from './zip.service'

import { StatusPipe } from './../shared/status.pipe'
import { OrderByPipe } from './view-exams/orderby.pipe'



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    ModalModule,
    DatepickerModule,
    AlertModule,
    AccordionModule
  ],
  declarations: [
    AdminComponent,
    CreateExamsComponent,
    CreateExaminersComponent,
    ViewExamsComponent,
    EditExamComponent,
    EditExaminerComponent,
    ViewExaminersComponent,
    GlobalViewComponent,
    DelegateComponent,
    ImportSubmissionComponent,
    StatusPipe,
    OrderByPipe
  ],
  providers: [
    ExamService,
    ExaminerService,
    ExerciseService,
    CSVService,
    UploadService,
    ZipService
  ]
})
export class AdminModule { }