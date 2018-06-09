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
import {SignUpComponent} from './components/authentication/sign-up/sign-up.component';
import {LandingPageComponent} from './components/company-information/landing-page/landing-page.component';
import {ForgotPasswordComponent} from './components/authentication/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './components/authentication/reset-password/reset-password.component';
import {PrivacyPolicyComponent} from './components/company-information/privacy-policy/privacy-policy.component';
import {ContactUsComponent} from './components/company-information/contact-us/contact-us.component';
import {TermsOfUseComponent} from './components/company-information/terms-of-use/terms-of-use.component';

import {UserService} from './services/user.service';
import {PrivacyPolicyService} from './services/company-information/privacy-policy.service';

// For proof of concept sign-up
import {OrganizationSelectComponent} from './components/authentication/organization-select/organization-select.component';
import {OrganizationService} from '@services/organization/organization.service';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {InvalidTokenComponent} from './components/authentication/invalid-token/invalid-token.component';
import {ForgotPasswordService} from '@services/authentication/forgot-password.service';
import {ConfirmEqualValidatorDirective} from './shared/confirm-equal-validator.directive';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';

import {SafePipe} from './shared/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    SignUpComponent,
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
	SafePipe,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    NgbModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    UserService,
    OrganizationService,
	PrivacyPolicyService,
    AuthenticateService,
    ForgotPasswordService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
