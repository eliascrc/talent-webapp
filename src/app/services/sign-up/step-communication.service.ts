import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class StepCommunicationService {

  private email = new BehaviorSubject('Invalid Email');
  registeredEmail$ = this.email.asObservable();

  constructor() {
  }

  registerEmail(email: string) {
    this.email.next(email);
  }

}
