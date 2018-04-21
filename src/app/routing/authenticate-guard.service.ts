import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { AuthenticateService } from '../services/auth/authenticate.service';

@Injectable()
export class AuthenticateGuard implements CanActivate{
	constructor(private authenticateService: AuthenticateService, private router: Router) {}
  
	canActivate() {
		// check if loggedUser is set  
		if (localStorage.getItem('loggedUser')) {
			// loggedUser is set, user is logged in
			return true;
		}
		// user is not logged, redirect to login
		this.router.navigate(['/login']);
		return false;
	}

}
