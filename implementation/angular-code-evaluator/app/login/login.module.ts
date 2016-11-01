import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { LoginAdminComponent }    from './login-admin.component';
import { LoginComponent }    from './login.component';

import { AuthService }    from './../shared/auth.service';


@NgModule({
declarations: [
    LoginComponent,
    LoginAdminComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],

})
export class LoginModule {}