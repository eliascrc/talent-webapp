import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateGuard } from '../../../routing/authenticate-guard.service';
import { AuthenticateService } from '../../../services/authentication/authenticate.service';
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
