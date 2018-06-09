import {Component, OnInit} from '@angular/core';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact-us-screen',
  templateUrl: './contact-us-screen.component.html',
  styleUrls: ['./contact-us-screen.component.css']
})
export class ContactUsScreenComponent implements OnInit {

  constructor(private router: Router, private authenticateService: AuthenticateService) {
  }

  ngOnInit() {
  }

  onOK() {
    if (this.authenticateService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/landing-page']);
    }
  }

}
