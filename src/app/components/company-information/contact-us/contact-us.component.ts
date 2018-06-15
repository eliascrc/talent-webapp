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
/**
 * Contact us component which displays and processes a different form for the user depending on his authentication state.
 *
 * @author Josue Leon Sarkis
 */
export class ContactUsComponent implements OnInit {

  loggedIn = false;
  displayForm = false;
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
    this.authenticateService.isLoggedIn()
      .then(response => {
          this.loggedIn = response;
          this.displayForm = true;
        }
      );
  }

  /**
   * Obtains the submitted form values and sends the request to the backend web service via the contact us service.
   * @param {NgForm} form
   */
  onSubmit(form: NgForm) {
    this.formData.issueType = form.value.issueType;
    this.formData.issue = form.value.issue;

    if (this.loggedIn) {
      this.contactUsService.authenticatedContactUs(this.formData.issueType, this.formData.issue).subscribe(() => {
        this.router.navigate(['/contact-us-screen']);
      }, () => {
      });
    } else {
      this.formData.firstName = form.value.firstName;
      this.formData.lastName = form.value.lastName;
      this.formData.email = form.value.email;
      this.contactUsService.unauthenticatedContactUs(this.formData.firstName, this.formData.lastName, this.formData.email,
        this.formData.issueType, this.formData.issue).subscribe(() => {
        this.router.navigate(['/contact-us-screen']);
      }, () => {
      });
    }
  }

}
