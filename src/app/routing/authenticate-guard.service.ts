import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticateService} from '../services/authentication/authenticate.service';

@Injectable()
export class AuthenticateGuard implements CanActivate {
  constructor(private authenticateService: AuthenticateService, private router: Router) {
  }

  canActivate() {
    if (this.authenticateService.isLoggedIn().then(response => response)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }


  }

}
