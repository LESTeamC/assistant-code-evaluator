import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent }   from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginAdminComponent } from './login/login-admin.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: AppComponent, data: {title:''}},
      { path: 'login', component: LoginComponent, data: {title:'Login'}},
      { path: 'loginadmin', component: LoginAdminComponent, data: {title:'LoginAdmin'}},
      { path: 'admin', 
        loadChildren: 'app/admin/admin.module#AdminModule',
       },
      { path: 'examiner', 
        loadChildren: 'app/examiner/examiner.module#ExaminerModule',
       },
      { path: '**', component: LoginComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule {}