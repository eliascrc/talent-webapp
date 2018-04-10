import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateGuard } from '../authenticate-guard.service';
import { AuthenticateService } from '../authenticate.service';
import { LoginComponent } from './login.component';
 
const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthenticateService,
    AuthenticateGuard
  ]
})
export class LoginRoutingModule {}