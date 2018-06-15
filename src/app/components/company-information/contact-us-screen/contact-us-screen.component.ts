import {Component, OnInit} from '@angular/core';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact-us-screen',
  templateUrl: './contact-us-screen.component.html',
  styleUrls: ['./contact-us-screen.component.css']
})
/**
 * Contact us component which displays and processes a confirmation message when the user submitted a contact us form.
 *
 * @author Josue Leon Sarkis
 */
export class ContactUsScreenComponent implements OnInit {

  constructor(private router: Router, private authenticateService: AuthenticateService) {
  }

  ngOnInit() {
  }

  /**
   * Redirects the user to dashboard if he is logged in, landing page if not.
   */
  onOK() {
    if (this.authenticateService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/landing-page']);
    }

    this.authenticateService.isLoggedIn()
      .then(response => {
          if (response) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/landing-page']);
          }
        }
      );
  }

}
