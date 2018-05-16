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

	login(username: string, password: string) {
		const body = `username=${username}&password=${password}`;
		return this.http
		.post(this.loginUrl, body, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: true } );
	}

	isLoggedIn(): Promise<boolean> {
		let loggedIn: boolean = false;
		return this.http.get(this.loggedInUrl, { withCredentials: true })
			.toPromise()
			.then(response => response == true);
	}

	storeUser() {
		this.http.get<User>(this.authenticatedUrl, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: true } )
		.subscribe(user => localStorage.setItem("loggedUser", JSON.stringify(user)));
	}
}
