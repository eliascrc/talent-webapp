import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../model/User';

@Injectable()
export class UserService {

	// angular injects an HttpClient instance through the constructor called http
	constructor(private http: HttpClient) { }
	
	/*
	 * getByUsername and create for now use a fake back end "simulated" with HttpInterceptor in temporary-backend.ts
	 * Replace the URL strings in the future to use the real back end
	 */
	
	getByUsername(username: string) {
        return this.http.get('/temporary-backend/users/' + username);
    }

	create(user: User) {
		return this.http.post('/temporary-backend/users', user);
	}
}