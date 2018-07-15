import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './routing/app-routing.module';

import {DashboardComponent} from './components/company-information/dashboard/dashboard.component';
import {LoginComponent} from './components/authentication/login/login.component';
// import { LoginRoutingModule } from './components/authentication/login/login-routing.module';
import {AboutComponent} from './components/company-information/about/about.component';
import {LandingPageComponent} from './components/company-information/landing-page/landing-page.component';
import {ForgotPasswordComponent} from './components/authentication/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './components/authentication/reset-password/reset-password.component';
import {PrivacyPolicyComponent} from './components/company-information/privacy-policy/privacy-policy.component';
import {ContactUsComponent} from './components/company-information/contact-us/contact-us.component';
import {TermsOfUseComponent} from './components/company-information/terms-of-use/terms-of-use.component';

import {UserService} from '@services/user.service';
import {PrivacyPolicyService} from '@services/company-information/privacy-policy.service';
import {TermsOfUseService} from '@services/company-information/terms-of-use.service';
import {SignupService} from '@services/sign-up/signup.service';
import {InvitationService} from '@services/sign-up/invitation.service';
import {StepCommunicationService} from '@services/sign-up/step-communication.service';

// For proof of concept sign-up
import {OrganizationSelectComponent} from './components/authentication/organization-select/organization-select.component';
import {OrganizationService} from '@services/organization/organization.service';
import {EditOrganizationService} from '@services/organization/edit-organization.service';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {InvalidTokenComponent} from './components/authentication/invalid-token/invalid-token.component';
import {ForgotPasswordService} from '@services/authentication/forgot-password.service';
import {ConfirmEqualValidatorDirective} from './shared/confirm-equal-validator.directive';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {FooterComponent} from './components/footer/footer.component';
import {ContactUsScreenComponent} from './components/company-information/contact-us-screen/contact-us-screen.component';
import {ContactUsService} from '@services/company-information/contact-us.service';
import {ProjectService} from '@services/project/project.service';
import {ResourceInformationService} from '@services/technical-resource/resource-information.service';
import {EditResourceInformationService} from '@services/technical-resource/edit-resource-information.service';

import {SanitizeHtmlPipe} from './shared/sanitize-html.pipe';

import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {SignUpStepOneComponent} from './components/sign-up/sign-up-step-one/sign-up-step-one.component';
import {SignUpStepTwoComponent} from './components/sign-up/sign-up-step-two/sign-up-step-two.component';
import {ProjectProfileComponent} from './components/project-profile/project-profile.component';
import {SignUpStepFourComponent} from './components/sign-up/sign-up-step-four/sign-up-step-four.component';
import {AcceptInviteComponent} from './components/sign-up/accept-invite/accept-invite.component';
import {CreateProjectComponent} from './components/create-project/create-project/create-project.component';
import {UserProfileComponent} from './components/profile/user-profile/user-profile.component';
import {SignUpStepThreeComponent} from './components/sign-up/sign-up-step-three/sign-up-step-three.component';
import {ProjectPositionService} from '@services/project-position/project-position.service';
import {EditOrganizationProfileComponent} from './components/profile/edit-organization-profile/edit-organization-profile.component';
import {OrganizationProfileComponent} from './components/profile/organization-profile/organization-profile.component';
import {CarouselModule} from 'primeng/primeng';
import {EditProfileComponent} from './components/profile/edit-profile/edit-profile.component';
import {SearchResourceComponent} from './components/search/search-resource/search-resource.component';
import {OrganizationSkillsComponent} from './components/profile/organization-profile/organization-skills/organization-skills.component';
import {FeedbackService} from '@services/feedback/feedback.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    DashboardComponent,
    LandingPageComponent,
    PrivacyPolicyComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ContactUsComponent,
    TermsOfUseComponent,
    OrganizationSelectComponent,
    InvalidTokenComponent,
    ConfirmEqualValidatorDirective,
    FooterComponent,
    ContactUsScreenComponent,
    SanitizeHtmlPipe,
    HeaderComponent,
    SidebarComponent,
    AcceptInviteComponent,
    SignUpStepOneComponent,
    SignUpStepTwoComponent,
    ProjectProfileComponent,
    SignUpStepThreeComponent,
    SignUpStepFourComponent,
    UserProfileComponent,
    CreateProjectComponent,
    UserProfileComponent,
    SearchResourceComponent,
    OrganizationProfileComponent,
    EditProfileComponent,
    EditOrganizationProfileComponent,
    OrganizationSkillsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    NgbModule.forRoot(),
    CarouselModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    UserService,
    OrganizationService,
    EditOrganizationService,
    PrivacyPolicyService,
    TermsOfUseService,
    AuthenticateService,
    ForgotPasswordService,
    ContactUsService,
    SignupService,
    StepCommunicationService,
    ResourceInformationService,
    EditResourceInformationService,
    InvitationService,
    ProjectService,
    ProjectPositionService,
    FeedbackService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
