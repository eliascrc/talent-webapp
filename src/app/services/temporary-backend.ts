import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Injectable()
export class TemporaryBackend implements HttpInterceptor {
	
	constructor(){};
	
	// intercept the requests sent by UserService and manage them with localStorage
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		
        // get users saved in localStorage
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

		// handle getUserByUsername
        if (request.url.match(/\/temporary-backend\/users\/\d+$/) && request.method === 'GET') {
            // separate the requested username
            let urlParts = request.url.split('/');
            let requestedUsername = urlParts[urlParts.length - 1];
				
			// find the user
            let requestedUser = users.filter(user => user.username === requestedUsername);
			
			let user;
			if (requestedUser.length > 0) {
				// user exists
				user = requestedUser[0];
			} else {
				// user doesn't exist, return null
				user = null;
			}
				
			// return user with a 200 OK
            return Observable.of(new HttpResponse({ status: 200, body: user }));
        }
		
		// handle createUser
        if (request.url.endsWith('/temporary-backend/users') && request.method === 'POST') {
			window.alert('INTERCEPTED CREATE USER');
            // get the user from the post's body
            let newUser = request.body;

			// check if user already exists
			let duplicatedUsernames = users.filter(user => user.username === newUser.username).length;
			// return error if user already exists
			if (duplicatedUsernames != 0) return Observable.throw('User already exists.');
			
            // save the new user in localStorage
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // return a 200 OK
            return Observable.of(new HttpResponse({ status: 200 }));
        }

		// handle login in the authenticate service
		window.alert(request.url);
		if(request.url.endsWith('temporary-backend/authenticate') && request.method === 'POST') {
			// find in localStorage the user requesting login
			
			let requestedUser = users.filter(user => {
				return user.username === request.body.username;
			})
			
			// user exists
			if (requestedUser.length === 1) {
				// build the response
				let user = requestedUser[0];
				let body = {
					username: user.username,
					firstName: user.firstName,
				    lastName: user.lastName,
				};
				
				// return a 200 OK with the user
				return Observable.of(new HttpResponse({
					status: 200,
					body: body,
				}));
			} else {
				// user does not exist
				return Observable.throw('User does not exist.');
			}
		}
    }
	
}

export let temporaryBackend = {
    provide: HTTP_INTERCEPTORS,
    useClass: TemporaryBackend,
	multi: true
};


