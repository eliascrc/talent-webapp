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

  constructor(private http: HttpClient) { }

  /**
   * Returns an observable that tries to send the sign up step one information to the backend web service
   *
   * @param {string} firstName the first name of the user
   * @param {string} lastName the last name of the user
   * @param {string} email the email of the user
   * @param {string} password the password of the user
   * @returns {Observable<Object>} the observable object
   */
  stepOne(firstName: string, lastName: string, email: string, password: string) {
    const bodyParameters = `firstName=${firstName}&lastName=${lastName}&email=${email}&password=${password}`;
    return this.http
      .post(this.stepOneUrl, bodyParameters,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true});
  }

}
