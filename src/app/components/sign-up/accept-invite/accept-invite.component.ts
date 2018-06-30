import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {InvitationService} from '../../../services/sign-up/invitation.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-accept-invite',
  templateUrl: './accept-invite.component.html',
  styleUrls: ['./accept-invite.component.css']
})
export class AcceptInviteComponent implements OnInit {
	firstName: string = '',
	lastName: string = '',
	token: string = '';
	organizationLogo: string; 

  constructor(private invitationService: InvitationService, public router: Router, private route: ActivatedRoute) {
	this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  ngOnInit() {
	  this.invitationService.
	  validateToken(this.token).
	  then(response  => {
               const userInfoObject = JSON.parse(JSON.stringify(response));
               this.firstName = userInfoObject.firstName;
               this.lastName = userInfoObject.lastname;
			   this.organizationLogo = userInfoObject.organization;
            });
      )//.catch(error => {this.router.navigate(['/invalid-token']);});
	  
  }

  /**
   * Obtains the submitted form values and sends the request to the backend web service via the accept-invite service.
   * @param {NgForm} form The form that the user modifies
   */
  onSubmit(form: NgForm) {
    if (this.validatePassword(form)) {
	  this.invitationService.
	  acceptInvite(this.token, form.value.nickname, form.value.password);
    }
  }

  /**
   * Validates if the password is safe enough and matches the confirmation
   * @param {NgForm} form The form that the user modifies
   * @returns {boolean} true if valid, false if not
   */
  validatePassword(form: NgForm) {
    const isPasswordSafeEnough = this.isPasswordSafeEnough(form);
    const passwordMatches = this.passwordsMatch(form);

    if (!isPasswordSafeEnough) {
      form.controls.password.setErrors({'incorrect': true});
    } else {
      form.controls.password.setErrors(null);
    }

    if (!passwordMatches) {
      form.controls.confirm.setErrors({'incorrect': true});
    } else {
      form.controls.confirm.setErrors(null);
    }

    return isPasswordSafeEnough && passwordMatches;
  }

  /**
   * Validates if the password has the security requirements of the back end
   * @param {NgForm} form The form that the user modifies
   * @returns {boolean} true if secure enough, false if not
   */
  isPasswordSafeEnough(form: NgForm) {
    const password = form.value.password;
    const symbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    return password.length >= 8 && /\d/.test(password) && /[a-z]/.test(password) && /[A-Z]/.test(password) && symbols.test(password);
  }

  /**
   * Validates if the password matches the password confirmation field
   * @param {NgForm} form The form that the user modifies
   * @returns {boolean} true if it matches, false if not
   */
  passwordsMatch(form: NgForm) {
    return form.value.confirm === form.value.password;
  }
}
