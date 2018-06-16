import {BasicEntity} from '@model/BasicEntity';

/**
 * Class that represents a User within the Talent system.
 * It contains the username, password, first name, last name and the information inherited from BasicEntity class.
 *
 * @author Elías Calderón
 */
export class User extends BasicEntity {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  administrator: boolean;
  credentialsNonExpired: boolean;
  username: string;
  firstName: string;
  lastName: string;
  token: string;

  constructor(user: any) {
    super(user);
    this.accountNonExpired = user.accountNonExpired;
    this.accountNonLocked = user.accountNonLocked;
    this.administrator = user.administrator;
    this.credentialsNonExpired = user.credentialsNonExpired;
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.token = user.token;
  }
}
