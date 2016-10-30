import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExaminerComponent } from './examiner.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkstationComponent }       from './workstation/workstation.component';


@NgModule({
  imports: [
    RouterModule.forChild([
    {
        path: '',
        component: ExaminerComponent,
        children: [
            {
                path: 'workstation',
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