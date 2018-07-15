import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from '../components/authentication/login/login.component';
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
import {ContactUsScreenComponent} from '../components/company-information/contact-us-screen/contact-us-screen.component';
import {UnauthenticateGuard} from './unauthenticate-guard.service';
import {AcceptInviteComponent} from '../components/sign-up/accept-invite/accept-invite.component';
import {SignUpStepOneComponent} from '../components/sign-up/sign-up-step-one/sign-up-step-one.component';
import {SignUpStepTwoComponent} from '../components/sign-up/sign-up-step-two/sign-up-step-two.component';
import {ProjectProfileComponent} from '../components/project-profile/project-profile.component';
import {SignUpStepFourComponent} from '../components/sign-up/sign-up-step-four/sign-up-step-four.component';
import {CreateProjectComponent} from '../components/create-project/create-project/create-project.component';
import {UserProfileComponent} from '../components/profile/user-profile/user-profile.component';
import {EditProfileComponent} from '../components/profile/edit-profile/edit-profile.component';
import {SignUpStepThreeComponent} from '../components/sign-up/sign-up-step-three/sign-up-step-three.component';
import {SearchResourceComponent} from '../components/search/search-resource/search-resource.component';
import {OrganizationProfileComponent} from '../components/profile/organization-profile/organization-profile.component';
import {EditOrganizationProfileComponent} from '../components/profile/edit-organization-profile/edit-organization-profile.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent, canActivate: [UnauthenticateGuard]},
  {path: 'landing-page', component: LandingPageComponent, canActivate: [UnauthenticateGuard]},
  {path: 'login', component: OrganizationSelectComponent, canActivate: [UnauthenticateGuard]},
  {path: 'sign-up/step-one', component: SignUpStepOneComponent, canActivate: [UnauthenticateGuard]},
  {path: 'sign-up/step-two', component: SignUpStepTwoComponent, canActivate: [UnauthenticateGuard]},
  {path: 'sign-up/step-four', component: SignUpStepFourComponent, canActivate: [AuthenticateGuard]},
  {path: 'sign-up/step-three', component: SignUpStepThreeComponent, canActivate: [UnauthenticateGuard]},
  {path: 'about', component: AboutComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'contact-us-screen', component: ContactUsScreenComponent},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  {path: 'terms-of-use', component: TermsOfUseComponent},
  {path: 'forgot-password/:uniqueIdentifier', component: ForgotPasswordComponent, canActivate: [UnauthenticateGuard]},
  {path: 'reset-password', component: ResetPasswordComponent, canActivate: [UnauthenticateGuard]},
  {path: 'invalid-token', component: InvalidTokenComponent, canActivate: [UnauthenticateGuard]},
  {path: 'login/:uniqueIdentifier', component: LoginComponent, canActivate: [UnauthenticateGuard]},
  {path: 'project-profile/:projectIdentifier', component: ProjectProfileComponent, canActivate: [AuthenticateGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticateGuard]},
  {path: 'accept-invite', component: AcceptInviteComponent, canActivate: [UnauthenticateGuard]},
  {path: 'profile/user-profile/:userId', component: UserProfileComponent, canActivate: [AuthenticateGuard]},
  {path: 'profile/edit-profile/:userId', component: EditProfileComponent, canActivate: [AuthenticateGuard]},
  {path: 'create-project', component: CreateProjectComponent, canActivate: [AuthenticateGuard]},
  {path: 'search/resource', component: SearchResourceComponent, canActivate: [AuthenticateGuard]},
  {path: 'organization-profile', component: OrganizationProfileComponent, canActivate: [AuthenticateGuard]},
  {path: 'edit-organization-profile', component: EditOrganizationProfileComponent, canActivate: [AuthenticateGuard]},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthenticateGuard, UnauthenticateGuard]
})
export class AppRoutingModule {
}

