export class User {
	username : string;
	firstName : string;
	lastName : string;
	password : string;
	enabled : boolean;
	passwordNeedsChange : boolean;
	lastLoginTimestamp : Date;
	
	constructor(user : any) {
		this.username = user.username;
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.password = user.password;
		this.enabled = user.enabled;
		this.passwordNeedsChange = user.passwordNeedsChange;
		this.lastLoginTimestamp  = user.lastLoginTimestamp ;
	}
}