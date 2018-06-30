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
  private stepThreeUrl = 'http://ws.talent.cr/ws/organization/create'

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

  /**
   * Returns a promise that tries to send the sign up step three information to the backend endpoint, in order to create an
   * organization for the user completing the sign up process.
   * @param {string} username
   * @param {string} organizationName
   * @param {string} organizationId
   * @returns {Promise<any>}
   */
  stepThree(username: string, organizationName: string, organizationId: string): Promise<any> {
    const bodyParameters = `username=${username}&organizationName=${organizationName}&organizationId=${organizationId}`;
    return this.http.post(this.stepThreeUrl, bodyParameters,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true})
      .toPromise();
  }

}
