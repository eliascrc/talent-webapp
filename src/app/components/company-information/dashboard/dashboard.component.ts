import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	fullName: string = "";
	
	constructor() { }

	ngOnInit() {
		let loggedUser: any = JSON.parse(localStorage.getItem('loggedUser'));
		if(loggedUser) {
			this.fullName = loggedUser.firstName + ' ' + loggedUser.lastName;
		} else {
			this.fullName = null;
		}
	}

}