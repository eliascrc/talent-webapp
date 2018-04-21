import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticateService {
	
	constructor(private http: HttpClient) {}
	
	login(username: string) {
		// Do an http POST, receive an Observable 
		return this.http.post<any>('temporary-backend/authenticate', {username: username}).map(user => {
			// function executed when the server responds
			if(user) {
				localStorage.setItem('loggedUser', JSON.stringify(user));
			}
			return user;	  
		});
	}
  
	logout() {
		localStorage.removeItem('loggedUser'); 
	}
}
