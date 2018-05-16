import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from '../components/authentication/login/login.component';
import {SignUpComponent} from '../components/authentication/sign-up/sign-up.component';
import {AboutComponent} from '../components/company-information/about/about.component';
import {DashboardComponent} from '../components/company-information/dashboard/dashboard.component';
import {AuthenticateGuard} from './authenticate-guard.service';
import {LandingPageComponent} from '../components/company-information/landing-page/landing-page.component';
import {ForgotPasswordComponent} from '../components/authentication/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from '../components/authentication/reset-password/reset-password.component';
import {PrivacyPolicyComponent} from '../components/company-information/privacy-policy/privacy-policy.component';
import {ContactUsComponent} from '../components/company-information/contact-us/contact-us.component';
import {TermsOfUseComponent} from '../components/company-information/terms-of-use/terms-of-use.component';
import {OrganizationSelectComponent} from '../components/authentication/organization-select/organization-select.component';
import {InvalidTokenComponent} from '../components/authentication/invalid-token/invalid-token.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'landing-page', component: LandingPageComponent},
  {path: 'login', component: OrganizationSelectComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  {path: 'terms-of-use', component: TermsOfUseComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'invalid-token', component: InvalidTokenComponent},
  {path: 'login/:uniqueIdentifier', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticateGuard]},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthenticateGuard]
})
export class AppRoutingModule {
}
