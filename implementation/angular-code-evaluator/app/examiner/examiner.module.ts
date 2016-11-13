import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ExaminerRoutingModule }    from './examiner-router.module'
import { ExaminerComponent }    from './examiner.component'
import { DashboardComponent }    from './dashboard/dashboard.component'
import { WorkstationComponent }    from './workstation/workstation.component'

import {ExaminerService} from './../shared/examiner.service'

@NgModule({
imports: [
    CommonModule,
    FormsModule,
    ExaminerRoutingModule
  ],
declarations: [
    DashboardComponent,
    WorkstationComponent,
    ExaminerComponent,

  ],
  providers: [
    ExaminerService
  ]
})
export class ExaminerModule {}