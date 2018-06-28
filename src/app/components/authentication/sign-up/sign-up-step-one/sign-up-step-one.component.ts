import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SignupService} from '@services/sign-up/signup.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-sign-up-step-one',
  templateUrl: './sign-up-step-one.component.html',
  styleUrls: ['./sign-up-step-one.component.css']
})
export class SignUpStepOneComponent implements OnInit {

  passwordMatch: boolean;

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  passwordsMatch(form: NgForm) {
    return form.value.confirm === form.value.password;
  }

  constructor(public router: Router, public signUpService: SignupService) {
    this.passwordMatch = true;
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (this.passwordsMatch(form)) {
/*
      this.formData.firstName = form.value.firstName;
      this.formData.lastName = form.value.lastName;
      this.formData.email = form.value.email;
      this.formData.password = form.value.password;

      this.signUpService.stepOne(this.formData.firstName, this.formData.lastName, this.formData.email,
        this.formData.password).subscribe(() => {
        this.router.navigate(['/sign-up/step-two']);
      }, () => {
      });*/

    } else {
      form.controls.confirm.setErrors({'incorrect': true})
      this.passwordMatch = false;
    }
  }

  onSignIn() {
    this.router.navigate(['/login']);
  }

}
