import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
	// gets filled by the form in the html
	newUserData: any = {};
	
	// inject a UserService instance to create the user
	constructor(private userService: UserService) { }
	
	ngOnInit() {
	}
	
	signUp() {
		this.userService.create(this.newUserData).subscribe(
			data => {
				window.alert("User created!");
			},
			error => {
				window.alert("Error: " + error);
			}
		);
	}

}
