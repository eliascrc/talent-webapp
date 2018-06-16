import {User} from '@model/User';

/**
 * Class that represents a System Administrator within the Talent system.
 * It contains the information inherited from User class.
 *
 * @author Elías Calderón
 */
export class SystemAdministrator extends User {
  constructor(systemadministrator: any) {
    super(systemadministrator);
  }
}
