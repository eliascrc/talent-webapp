import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {SignupService} from '@services/sign-up/signup.service';

@Component({
  selector: 'app-sign-up-step-three',
  templateUrl: './sign-up-step-three.component.html',
  styleUrls: ['./sign-up-step-three.component.css']
})
export class SignUpStepThreeComponent implements OnInit {

  private static DNS_REGEX: RegExp = new RegExp('^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]))*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$');

  formData = {
    organizationName: '',
    organizationId: ''
  };

  constructor(public router: Router, public signUpService: SignupService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (this.isOrganizationIdValid(form) && this.isNameNotEmpty(form)) {
      this.formData.organizationName = form.value.organizationName.trim();
      this.formData.organizationId = form.value.organizationIdentifier;
      console.log('Successful fields');
    }
  }

  isOrganizationIdValid(form: NgForm): boolean {
    if (SignUpStepThreeComponent.DNS_REGEX.test(form.value.organizationId)) {
      return true;
    }
    form.controls.organizationId.setErrors({'incorrect': true});
    return false;
  }

  isNameNotEmpty(form: NgForm): boolean {
    if (form.value.organizationName.trim() !== '') {
      return true;
    }
    form.controls.organizationName.setErrors({'incorrect': true});
    return false;
  }

}
