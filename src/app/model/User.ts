export class User {
  accountNonExporired: boolean;
  accountNonLocked: boolean;
  administrator: boolean;
  credentialsNonExpired: boolean;
  entityCreationTimestampo: Date;
  entityVersion: any;
  username: string;
  firstName: string;
  lastName: string;
  id: string;
  lastUpdatedTimestamp: Date;

  constructor(user: any) {
    this.accountNonExporired = user.accountNonExporired;
    this.accountNonLocked = user.accountNonLocked;
    this.administrator = user.administrator;
    this.credentialsNonExpired = user.credentialsNonExpired;
    this.entityCreationTimestampo = user.entityCreationTimestampo;
    this.entityVersion = user.entityVersion;
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.id = user.id;
    this.lastUpdatedTimestamp = user.lastUpdatedTimestamp;
  }
}
