import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {LocationStrategy} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn = false;

  constructor(private router: Router, private authenticateService: AuthenticateService, private url: LocationStrategy) {
  }

  ngOnInit() {
    this.authenticateService.isLoggedIn()
      .then(response => {
          this.loggedIn = response;
        }
      );
  }

  onLogout() {
    this.authenticateService.logout().then(response => {
      this.router.navigate(['/landing-page']);
      location.reload();
    });
  }

  onSignIn() {
      this.router.navigate(['/login']);
  }

}
