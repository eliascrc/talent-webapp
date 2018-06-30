import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SignupService} from 'app/services/sign-up/signup.service';
import {NgForm} from '@angular/forms';
import {StepCommunicationService} from '@services/sign-up/step-communication.service';

@Component({
  selector: 'app-sign-up-step-one',
  templateUrl: './sign-up-step-one.component.html',
  styleUrls: ['./sign-up-step-one.component.css']
})

/**
 * Sign Up component which displays and processes the step one form for the creation of a user.
 *
 * @author Elias Calderon
 */
export class SignUpStepOneComponent implements OnInit {

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  constructor(public router: Router, public signUpService: SignupService, public stepCommunicationService: StepCommunicationService) {

  }

  ngOnInit() {
  }

  /**
   * Obtains the submitted form values and sends the request to the backend web service via the sign up service.
   * @param {NgForm} form The form that the user modifies
   */
  onSubmit(form: NgForm) {
    if (this.validatePassword(form)) {
      this.formData.firstName = form.value.firstName;
      this.formData.lastName = form.value.lastName;
      this.formData.email = form.value.email;
      this.formData.password = form.value.password;

      this.signUpService.stepOne(this.formData.firstName, this.formData.lastName, this.formData.email,
        this.formData.password).subscribe(() => {

        this.stepCommunicationService.registerEmail(this.formData.email);
        this.router.navigate(['/sign-up/step-two']);

      }, () => {});
    }
  }

  /**
   * Redirects the user to the sign in page
   */
  onSignIn() {
    this.router.navigate(['/login']);
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
