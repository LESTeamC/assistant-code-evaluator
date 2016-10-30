import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AdminModule }   from './admin/admin.module';


import {RoutingModule} from './routing.module';
import { AppComponent }   from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginAdminComponent } from './login/login-admin.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    Ng2BootstrapModule,
    AdminModule,

  ],
  declarations: [
    AppComponent,
    LoginComponent,
    LoginAdminComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}