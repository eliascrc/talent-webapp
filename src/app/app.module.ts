import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login/login-routing.module';
import { AboutComponent } from './about/about.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserService } from './services/user.service';

// For proof of concept sign-up
import { temporaryBackend } from './services/temporary-backend'


@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		AboutComponent,
		SignUpComponent,
		DashboardComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule,
		NgbModule,
		LoginRoutingModule
	],
	providers: [
		UserService,
		
		// For proof of concept sign-up
		temporaryBackend
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
