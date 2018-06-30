import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

/**
 * Service that processes backend web services requests for the /ws/signUp resources.
 *
 * @author Elias Calderon
 */
@Injectable()
export class SignupService {

  private stepOneUrl = 'http://ws.talent.cr/ws/signUp/stepOne';
  private stepTwoUrl = 'http://ws.talent.cr/ws/signUp/stepTwo';
  private stepFourUrl = 'http://ws.talent.cr/ws/invitation/send';

  constructor(private http: HttpClient) { }

  /**
   * Returns an observable that tries to send the sign up step one information to the backend web service
   *
   * @param {string} firstName the first name of the user
   * @param {string} lastName the last name of the user
   * @param {string} nickname the nickname of the user
   * @param {string} email the email of the user
   * @param {string} password the password of the user
   * @returns {Observable<Object>} the observable object
   */
  stepOne(firstName: string, lastName: string, nickname: string, email: string, password: string) {
    const bodyParameters = `firstName=${firstName}&lastName=${lastName}&nickname=${nickname}&email=${email}&password=${password}`;
    return this.http
      .post(this.stepOneUrl, bodyParameters,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true});
  }

  stepTwo(email: string, code: string) {
    const bodyParameters = `email=${email}&code=${code}`;
    return this.http
      .post(this.stepTwoUrl, bodyParameters,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true});
  }

  stepFour(serializedInvitations: string) {
    const bodyParameters = `invitations=${serializedInvitations}`;
    return this.http
      .post(this.stepFourUrl, bodyParameters,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true});
  }

}
