import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { AdminComponent }    from './admin.component'
import { AdminRoutingModule }    from './admin-routing.module'

import { CreateExamsComponent }    from './create-exams/create-exams.component'
import { CreateExaminersComponent }    from './create-examiners/create-examiners.component'
import { DelegateComponent }    from './delegate/delegate.component'
import { GlobalViewComponent }    from './global-view/global-view.component'
import { ViewExaminersComponent }    from './view-examiners/view-examiners.component'
import { ViewExamsComponent }    from './view-exams/view-exams.component'
import { ModalModule, AlertModule, DatepickerModule} from 'ng2-bootstrap/ng2-bootstrap';

import {ExamService} from './exam.service'
import {ExaminerService} from './../shared/examiner.service'
import {ExerciseService} from './../shared/exercise.service'
import {CSVService} from './create-exams/csv.service'

import {StatusPipe} from './../shared/status.pipe'


@NgModule({
imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    ModalModule,
    AlertModule,
    DatepickerModule
  ],
declarations: [
    AdminComponent,
    CreateExamsComponent,
    CreateExaminersComponent,
    ViewExamsComponent,
    ViewExaminersComponent,
    GlobalViewComponent,
    DelegateComponent,
    StatusPipe,
  ],
  providers: [
    ExamService,
    ExaminerService,
    ExerciseService,
    CSVService,
    
  ]
})
export class AdminModule {}