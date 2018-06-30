import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class StepCommunicationService {

  private email = new Subject<string>();

  registeredEmail$ = this.email.asObservable();

  constructor() {
  }

  registerEmail(email: string) {
    this.email.next(email);
  }

}
