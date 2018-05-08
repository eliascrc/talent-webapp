import { NgModule } 				from '@angular/core';
import { RouterModule, Routes }		from '@angular/router';

import { LoginComponent } 			from '../login/login.component';
import { SignUpComponent } 			from '../sign-up/sign-up.component';
import { AboutComponent } 			from '../about/about.component';
import { DashboardComponent } 		from '../dashboard/dashboard.component';
import { AuthenticateGuard } 		from './authenticate-guard.service';
import {LandingPageComponent} from '../landing-page/landing-page.component';

const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'about', component: AboutComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticateGuard]},
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
  providers: [AuthenticateGuard]
})
export class AppRoutingModule { }
