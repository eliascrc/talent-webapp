import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { User } from "@model/User";
import { Http } from '@angular/http';

@Injectable()
export class AuthenticateService {

	private loginUrl: string = 'http://ws.talent.cr/ws/login';
	private logoutUrl: string = 'http://ws.talent.cr/ws/logout';
	private loggedInUrl: string = 'http://ws.talent.cr/ws/user/loggedIn';
	private authenticatedUrl: string = 'http://ws.talent.cr/ws/user/authenticated';

	constructor(private http: HttpClient) { }

	/**
	 * Returns an observable that tries to log in the user using the log in web service
	 */
	login(username: string, password: string, organizationIdentifier: string) {
		const body = `username=${username}&password=${password}&organizationIdentifier=${organizationIdentifier}`;
		return this.http
		.post(this.loginUrl, body, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: true } );
	}

	/**
	 * Returns a promise to return if the user is logged in or not it compares the string sent by the logged in
	 * web service to determine if the user is logged in
	 */
	isLoggedIn(): Promise<boolean> {
		return this.http.get(this.loggedInUrl, { withCredentials: true })
			.toPromise()
      .then(response => {
        return response == true;
      });
	}

	/**
	 * Stores the logged user in local storage using the authenticate web service returns a promise so that the
	 * login component can wait for the request to complete before redirecting
	 */
	storeUser(): Promise<any> {
		return this.http.get<User>(this.authenticatedUrl, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: true } )
		.toPromise().then(user => localStorage.setItem("loggedUser", JSON.stringify(user)));
	}

	getLoggedInUserInfo(): Promise<any> {
    return this.http.get<any>(this.authenticatedUrl, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      withCredentials: true } ).toPromise();
  }

	logout(): Promise<any> {
    return this.http
      .post(this.logoutUrl, null, { headers: null, withCredentials: true } ).toPromise();
  }
}
