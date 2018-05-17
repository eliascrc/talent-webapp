import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { User } from "@model/User"

@Injectable()
export class AuthenticateService {

	private loginUrl: string = 'http://ws.talent.cr/ws/login';
	private loggedInUrl: string = 'http://ws.talent.cr/ws/user/loggedIn';
	private authenticatedUrl: string = 'http://ws.talent.cr/ws/user/authenticated';

	constructor(private http: HttpClient) { }

	/**
	 * Returns an observable that tries to log in the user using the log in web service
	 */
	login(username: string, password: string) {
		const body = `username=${username}&password=${password}`;
		return this.http
		.post(this.loginUrl, body, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: true } );
	}

	/**
	 * Returns a promise to return if the user is logged in or not it compares the string sent by the logged in
	 * web service to determine if the user is logged in
	 */
	isLoggedIn(): Promise<boolean> {
		let loggedIn: boolean = false;
		return this.http.get(this.loggedInUrl, { withCredentials: true })
			.toPromise()
			.then(response => response == true);
	}

	/**
	 * Stores the logged user in local storage using the authenticate web service
	 */
	storeUser() {
		this.http.get<User>(this.authenticatedUrl, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: true } )
		.subscribe(user => localStorage.setItem("loggedUser", JSON.stringify(user)));
	}
}
