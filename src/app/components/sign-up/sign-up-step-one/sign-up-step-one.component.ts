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

  formSubmitted = false;
  passwordInvalid = true;
  signUpBtnMessage = 'Sign up';
  alreadyUsedAccountMsg = '';

  formData = {
    firstName: '',
    lastName: '',
    nickname: '',
    email: '',
    password: ''
  };

  constructor(public router: Router, public signUpService: SignupService, private stepCommunicationService: StepCommunicationService) {
  }

  ngOnInit() {
  }

  /**
   * Obtains the submitted form values and sends the request to the backend web service via the sign up service.
   * @param {NgForm} form The form that the user modifies
   */
  onSubmit(form: NgForm) {
    if (this.validatePassword(form) && !this.formSubmitted) {
      this.formData.firstName = form.value.firstName;
      this.formData.lastName = form.value.lastName;
      this.formData.nickname = form.value.nickname;
      this.formData.email = form.value.email;
      this.formData.password = form.value.password;
      this.formSubmitted = true;
      this.signUpBtnMessage = 'Working...';

      this.signUpService.stepOne(this.formData.firstName, this.formData.lastName, this.formData.nickname, this.formData.email,
        this.formData.password).subscribe(() => {

        this.stepCommunicationService.registerEmail(this.formData.email);
        this.router.navigate(['/sign-up/step-two']);

      }, () => {
        this.alreadyUsedAccountMsg = 'This account has already been used and activated';
        document.getElementById('already-used-error').style.display = 'block';
        this.formSubmitted = false;
        this.signUpBtnMessage = 'Sign up';
        scroll(0, 0);
      });
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
      document.getElementById('password-error').classList.add('p-invalid');
      document.getElementById('password').classList.add('p-invalid');
      this.passwordInvalid = true;

    } else {
      form.controls.password.setErrors(null);
      document.getElementById('password-error').classList.remove('p-invalid');
      document.getElementById('password').classList.remove('p-invalid');
      this.passwordInvalid = false;
    }

    if (!passwordMatches) {
      form.controls.confirm.setErrors({'incorrect': true});
      document.getElementById('confirm-password-error').classList.add('p-invalid');
      document.getElementById('confirm-password').classList.add('p-invalid');
      this.passwordInvalid = true;

    } else {
      form.controls.confirm.setErrors(null);
      document.getElementById('confirm-password-error').classList.remove('p-invalid');
      document.getElementById('confirm-password').classList.remove('p-invalid');
      this.passwordInvalid = this.passwordInvalid || false;
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
