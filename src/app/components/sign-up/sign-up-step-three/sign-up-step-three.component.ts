import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {SignupService} from '@services/sign-up/signup.service';
import {StepCommunicationService} from '@services/sign-up/step-communication.service';

@Component({
  selector: 'app-sign-up-step-three',
  templateUrl: './sign-up-step-three.component.html',
  styleUrls: ['./sign-up-step-three.component.css']
})
/**
 * Sign Up component which displays and processes the step three form for the creation of an organization.
 *
 * @author Josue Leon Sarkis
 */
export class SignUpStepThreeComponent implements OnInit {

  private static DNS_REGEX: RegExp = new RegExp('^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]))*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$');

  private userEmail: string;
  formData = {
    organizationName: '',
    organizationId: ''
  };

  constructor(public router: Router, public signUpService: SignupService, private stepCommunicationService: StepCommunicationService) { }

  /**
   * Verifies that the previous steps were completed successfully.
   */
  ngOnInit() {
    this.stepCommunicationService.registeredEmail$.subscribe(email => {
      if (email === 'Invalid Email') {
        this.router.navigate(['/sign-up/step-one']);
      } else {
        this.userEmail = email;
      }
    });
  }

  /**
   * Procceses the form submission, validating both fields and if valid, communicating with the service to process the backend request.
   * Displays the respective error message if invalid.
   * @param {NgForm} form
   */
  onSubmit(form: NgForm) {
    if (this.isOrganizationIdValid(form) && this.isNameNotEmpty(form)) {
      this.formData.organizationName = form.value.organizationName.trim();
      this.formData.organizationId = form.value.organizationId;
      this.signUpService.stepThree(this.userEmail, this.formData.organizationName, this.formData.organizationId)
        .then(response => {
          this.router.navigate(['/sign-up/step-four']);
        }, error => {
          form.controls.organizationId.setErrors({'incorrect': true});
        });
    }
  }

  /**
   * Validates the organization id, to check it complies with the DNS domain restrictions.
   * @param {NgForm} form
   * @returns {boolean}
   */
  isOrganizationIdValid(form: NgForm): boolean {
    if (SignUpStepThreeComponent.DNS_REGEX.test(form.value.organizationId)) {
      return true;
    }
    form.controls.organizationId.setErrors({'incorrect': true});
    return false;
  }

  /**
   * Validates that the organization's name is not null or empty.
   * @param {NgForm} form
   * @returns {boolean}
   */
  isNameNotEmpty(form: NgForm): boolean {
    if (form.value.organizationName.trim() !== '') {
      return true;
    }
    form.controls.organizationName.setErrors({'incorrect': true});
    return false;
  }

}
