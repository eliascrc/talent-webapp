import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from '@services/authentication/authenticate.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  loggedIn = false;

  constructor(private authenticateService: AuthenticateService) { }

  ngOnInit() {
    this.authenticateService.isLoggedIn()
      .then(response => {
          this.loggedIn = response;
        }
      );
  }

}
