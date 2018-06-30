import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

/**
 *
 */
@Component({
  selector: 'app-sign-up-step-two',
  templateUrl: './sign-up-step-two.component.html',
  styleUrls: ['./sign-up-step-two.component.css']
})
export class SignUpStepTwoComponent implements OnInit {

  completeForm = false;
  validNumber = true;
  email: string;

  constructor(public router: Router) {
  }

  ngOnInit() {
  }

  /**
   * Obtains the submitted form values and sends the request to the backend web service via the sign up service.
   * @param {NgForm} form The form that the user modifies
   */
  onSubmit(form: NgForm) {

  }

  validateField(event: any, position: number) {
    const changedNumber = event.target.value;
    let offset = 1;

    if (isNaN(changedNumber)) {
      event.target.value = null;
      console.log(event.target.classList);
      this.completeForm = false;
      return;
    }

    if (changedNumber.length > 1) {
      event.target.value = changedNumber[0];
    }

    if (event.target.value.length === 0) {
      if (position === 0) {
        offset = 0;
      } else {
        offset = -1;
      }
    }

    const elements = document.getElementsByClassName('confirmation-number');

    this.completeForm = true;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      this.completeForm = this.completeForm && ( (element as HTMLInputElement).value.length > 0);
    }

    const nextElement = (document.getElementsByClassName('confirmation-number')[position + offset]) as HTMLElement;
    nextElement.focus();
  }

}
