import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AdminModule }   from './admin/admin.module';
import { ExaminerModule }   from './examiner/examiner.module';
import { LoginModule }   from './login/login.module';


import {RoutingModule} from './routing.module';
import { AppComponent }   from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginAdminComponent } from './login/login-admin.component';
import { AuthService } from './shared/auth.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    Ng2BootstrapModule,
    AdminModule,
    LoginModule,
    ExaminerModule

  ],
  declarations: [
    AppComponent,
  ],
  providers: [AuthService],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}