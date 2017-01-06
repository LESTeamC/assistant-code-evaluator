import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ExaminerRoutingModule }    from './examiner-router.module'
import { ExaminerComponent }    from './examiner.component'
import { DashboardComponent }    from './dashboard/dashboard.component'
import { WorkstationComponent }    from './workstation/workstation.component'

import { ModalModule, AlertModule} from 'ng2-bootstrap/ng2-bootstrap';

import {ExaminerService} from './../shared/examiner.service'
import {SubmissionService} from './submission.service'
import {NavigationService} from './navigation.service'

import {SubmissionStatusPipe} from './submission-status.pipe'
import {FilterPipe} from './filter.pipe'


@NgModule({
imports: [
    CommonModule,
    FormsModule,
    ExaminerRoutingModule,
    AlertModule,
    ModalModule
  ],
declarations: [
    DashboardComponent,
    WorkstationComponent,
    ExaminerComponent,
    SubmissionStatusPipe,
    FilterPipe
    
  ],
  providers: [
    ExaminerService,
    SubmissionService,
    NavigationService
  ]
})
export class ExaminerModule {}