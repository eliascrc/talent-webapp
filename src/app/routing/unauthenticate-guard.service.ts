import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticateService} from '../services/authentication/authenticate.service';

@Injectable()
export class UnauthenticateGuard implements CanActivate {
  constructor(private authenticateService: AuthenticateService, private router: Router) {
  }

  canActivate(): Promise<boolean> {
    return this.authenticateService.isLoggedIn()
      .then(response => {
        if (response) {
          this.router.navigate(['/dashboard']);
        }
        return !response;
      });
  }

}
