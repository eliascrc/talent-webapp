export class User {
	username : string;
	firstName : string;
	lastName : string;
	password : string;
	enabled : boolean;
	passwordNeedsChange : boolean;
	lastLoginTimestamp : Date;
	// Other attributes are objects that have not been set up in the webapp
}