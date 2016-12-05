import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExaminerComponent } from './examiner.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkstationComponent }       from './workstation/workstation.component';

import {AuthGuard} from './../shared/auth-guard.service'


@NgModule({
  imports: [
    RouterModule.forChild([
    {
        path: '',
        component: ExaminerComponent,
        canActivateChild: [AuthGuard],
        children: [
            {   
                //always navigate passing the submission ID.
                path: 'workstation/:id',
                component: WorkstationComponent,
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
        ]
    }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    
  ]
})
export class ExaminerRoutingModule { }