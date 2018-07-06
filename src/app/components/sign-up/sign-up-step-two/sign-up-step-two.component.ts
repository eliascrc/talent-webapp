import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {StepCommunicationService} from '@services/sign-up/step-communication.service';
import {SignupService} from '@services/sign-up/signup.service';

@Component({
  selector: 'app-sign-up-step-two',
  templateUrl: './sign-up-step-two.component.html',
  styleUrls: ['./sign-up-step-two.component.css']
})
/**
 * Sign Up component which displays and processes the step two form for the activation of a user account.
 *
 * @author Elias Calderon
 */
export class SignUpStepTwoComponent implements OnInit {

  completeForm = false;
  validCode = true;
  errorMessage = '';
  nextStepBtnMessage = 'Done';
  formSubmitted = false;
  email: string;

  constructor(public router: Router, public signUpService: SignupService, private stepCommunicationService: StepCommunicationService) {
  }

  ngOnInit() {
    this.stepCommunicationService.registeredEmail$.subscribe(email => {
      if (email === 'Invalid Email') {
        this.router.navigate(['/sign-up/step-one']);
      } else {
        this.email = email;
      }
    });
  }

  /**
   * Obtains the submitted form values and sends the request to the backend web service via the sign up service.
   * @param {NgForm} form The form that the user modifies
   */
  onSubmit(form: NgForm) {
    const code = form.value.firstNumber[0] + form.value.secondNumber[0] + form.value.thirdNumber[0] + form.value.fourthNumber[0]
      + form.value.fifthNumber[0] + form.value.sixthNumber[0];

    this.formSubmitted = true;
    this.nextStepBtnMessage = 'Working...';

    this.signUpService.stepTwo(this.email, code).subscribe(() => {
      this.router.navigate(['/sign-up/step-three']);

    }, () => {
      this.validCode = false;
      this.invalidateFields();
      this.formSubmitted = false;
      this.nextStepBtnMessage = 'Done';
    });

  }

  /**
   * Validates the number field of the code
   *
   * @param event the triggering event
   * @param {number} position the number position
   */
  validateField(event: any, position: number) {
    const changedNumber = event.target.value.valueOf();
    let offset = 1;

    if (isNaN(changedNumber)) {
      event.target.value = null;
      this.completeForm = false;
      return;
    }

    if (changedNumber.length > 1) {
      event.target.value = changedNumber[0];
    }

    console.log(changedNumber);
    if (event.target.value.length === 0) {
      if (position === 0 || changedNumber.length > 0) {
        offset = 0;
      } else if (changedNumber.length === 0) {
        offset = -1;
      }
    }

    const elements = document.getElementsByClassName('confirmation-number');

    this.completeForm = true;
    for (let i = 0; i < elements.length; i++) {
      const element = (elements[i] as HTMLInputElement);
      this.completeForm = this.completeForm && (element.value.length > 0);
    }

    if (this.completeForm) {
      this.validCode = true;
    }

    if ( (position + offset) < 6 ) {
      const nextElement = (document.getElementsByClassName('confirmation-number')[position + offset]) as HTMLElement;
      nextElement.focus();
    }
  }

  /**
   * Puts the class to the numbers for showing the code as invalid
   */
  invalidateFields() {
    const elements = document.getElementsByClassName('confirmation-number');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      (element as HTMLInputElement).classList.add('invalid-code');
      (element as HTMLInputElement).value = '';
    }

    this.errorMessage = 'The code entered is invalid';
  }

}
