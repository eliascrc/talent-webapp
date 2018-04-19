export class User {
	username: string;
	firstName: string;
	lastName: string;
	passwordNeedsChange: boolean;
	enabled: boolean;
	lastLoginTimestamp: Date;
	
	constructor(user: any) {
		this.username = user.username;
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.enabled = user.enabled;
		this.passwordNeedsChange = user.passwordNeedsChange;
		this.lastLoginTimestamp  = new Date(user.lastLoginTimestamp.getTime());
	}
}