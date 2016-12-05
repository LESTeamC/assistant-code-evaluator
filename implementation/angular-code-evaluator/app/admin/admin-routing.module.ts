import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent }     from './admin.component';

import { CreateExamsComponent } from './create-exams/create-exams.component';
import { CreateExaminersComponent }       from './create-examiners/create-examiners.component';
import { DelegateComponent }     from './delegate/delegate.component';
import { GlobalViewComponent }     from './global-view/global-view.component';
import { ViewExamsComponent }     from './view-exams/view-exams.component';
import { ViewExaminersComponent }     from './view-examiners/view-examiners.component';
import { ImportSubmissionComponent }     from './view-exams/import-submission.component';

import { AuthGuard } from './../shared/auth-guard.service'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'view-exams',
            component: ViewExamsComponent,
          },
          {
            path: 'create-exams',
            component: CreateExamsComponent,
          },
          {
            path: 'create-examiners',
            component: CreateExaminersComponent,
          },
          {
            path: 'delegate',
            component: DelegateComponent,
          },
          {
            path: 'global-view/:id',
            component: GlobalViewComponent,
          },
          {
            path: 'view-exams',
            component: ViewExamsComponent,
          },
          {
            path: 'view-examiners',
            component: ViewExaminersComponent,
          },
          {
            path: 'import-submission/:id',
            component: ImportSubmissionComponent,
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
export class AdminRoutingModule { }