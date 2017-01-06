import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard }      from './shared/auth-guard.service';

import { AppComponent }   from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginAdminComponent } from './login/login-admin.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      { 
        path: '', 
        component: AppComponent, 
        data: {title:''}
      },
      { 
        path: 'login', 
        component: LoginComponent, 
        data: {title:'Login'}
      },
      { 
        path: 'loginadmin', 
        component: LoginAdminComponent, 
        data: {title:'LoginAdmin'}
      },
      { 
        path: 'admin', 
        canActivate: [AuthGuard],
        loadChildren: 'app/admin/admin.module#AdminModule',
       },
      { 
        path: 'examiner', 
        canActivate: [AuthGuard],
        loadChildren: 'app/examiner/examiner.module#ExaminerModule',
       },
      { 
        path: '**', 
        component: LoginComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule {}