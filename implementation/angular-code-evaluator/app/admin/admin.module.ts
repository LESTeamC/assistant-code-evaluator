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


@NgModule({
imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ],
declarations: [
    AdminComponent,
    CreateExamsComponent,
    CreateExaminersComponent,
    ViewExamsComponent,
    ViewExaminersComponent,
    GlobalViewComponent,
    DelegateComponent,
  ],
  providers: [
  ]
})
export class AdminModule {}