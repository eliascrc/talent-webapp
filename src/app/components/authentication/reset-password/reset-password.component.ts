import { Component, OnInit } from '@angular/core';
import {ForgotPasswordService} from '../../../services/authentication/forgot-password.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../model/User';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  userData: any = {};
  passConfirm: any = {};
  token: string;
  user: User;

  constructor(private forgotPasswordService: ForgotPasswordService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  ngOnInit() {	  
    this.forgotPasswordService
      .validateToken(this.token)
      .catch(error => {
        this.router.navigate(['/invalid-token']);
      });
  }

  resetPassword() {
    this.forgotPasswordService.resetPassword(this.token, this.userData.password)
      .then( result => {
        this.forgotPasswordService.logUser()
          .then(result2 => {
            this.user = new User(result2);
            this.router.navigate(['/dashboard']);
          });
      });
  }
}
