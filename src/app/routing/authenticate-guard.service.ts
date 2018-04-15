import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { AuthenticateService } from '../services/auth/authenticate.service';

@Injectable()
export class AuthenticateGuard implements CanActivate{
  constructor(private authenticateService: AuthenticateService, private router: Router) {}
  
  canActivate() {
    if (this.authenticateService.mockLoginStatus) {
		return true;
	}
	this.router.navigate(['/login']);
    return false;
  }

}
