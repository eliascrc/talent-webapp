import {Component, OnInit} from '@angular/core';
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

  email = 'marianaabellan@gmail.com';

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

  /**
   * Redirects the user to the sign in page
   */
  onSignIn() {
    this.router.navigate(['/login']);
  }

  validateField(event: any, position: number) {
    const changedNumber = event.target.value;
    let offset = 1;

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

    const element = (document.getElementsByClassName('confirmation-number')[position + offset]) as HTMLElement;
    console.log(element.innerHTML);
    element.focus();
  }

}
