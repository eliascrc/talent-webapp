import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ForgotPasswordService} from '../../../services/authentication/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  userData: any = {};
  organizationIdentifier: string;

  constructor(private route: ActivatedRoute, private forgotPasswordService: ForgotPasswordService) { }

  ngOnInit() {
	this.organizationIdentifier = this.route.snapshot.paramMap.get('uniqueIdentifier');
  }

  forgotPassword() {
	document.getElementById('confirmation-message').style.display = 'block';
    document.getElementById('recover-password-form').style.display = 'none';
    this.forgotPasswordService.forgotPassword(this.userData.email, this.organizationIdentifier);
  }
}
