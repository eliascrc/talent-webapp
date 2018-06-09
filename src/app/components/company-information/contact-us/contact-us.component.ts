import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {ContactUsService} from '@services/company-information/contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  loggedIn: boolean;
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    issueType: '',
    issue: ''
  };

  constructor(private router: Router, private authenticateService: AuthenticateService, private contactUsService: ContactUsService) {
  }

  ngOnInit() {
    this.authenticateService.isUserLoggedIn().subscribe(
      (response) => this.loggedIn = Boolean(response),
      (error) => {}
    );
  }

  onSubmit(form: NgForm) {
    this.formData.firstName = form.value.firstName;
    this.formData.lastName = form.value.lastName;
    this.formData.email = form.value.email;
    this.formData.issueType = form.value.issueType;
    this.formData.issue = form.value.issue;

    if (this.authenticateService.isLoggedIn()) {
      this.contactUsService.authenticatedContactUs(this.formData.issueType, this.formData.issue).subscribe(() => {
        this.router.navigate(['/contact-us-screen']);
      }, () => {});
    } else {
      this.contactUsService.unauthenticatedContactUs(this.formData.firstName, this.formData.lastName, this.formData.email,
        this.formData.issueType, this.formData.issue).subscribe(() => {
        this.router.navigate(['/contact-us-screen']);
      }, () => {});
    }
  }

}
