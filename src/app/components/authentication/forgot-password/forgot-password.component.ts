import { Component, OnInit } from '@angular/core';
import {ForgotPasswordService} from '../../../services/authentication/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  userData: any = {};

  constructor(private forgotPasswordService: ForgotPasswordService) { }

  ngOnInit() { }

  forgotPassword() {
    document.getElementById('confirmation-message').style.display = 'block';
    document.getElementById('recover-password-form').style.display = 'none';
    this.forgotPasswordService.forgotPassword(this.userData.email);
  }

}
