import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

/**
 * Service that processes backend web services requests for the /ws/signUp resources.
 *
 * @author Elias Calderon, Josue Leon Sarkis
 */
@Injectable()
export class SignupService {

  private stepOneUrl = 'http://ws.talent.cr/ws/signUp/stepOne';
  private stepTwoUrl = 'http://ws.talent.cr/ws/signUp/stepTwo';
  private stepThreeUrl = 'http://ws.talent.cr/ws/organization/create';
  private stepFourUrl = 'http://ws.talent.cr/ws/invitation/send';

  constructor(private http: HttpClient) {
  }

  /**
   * Returns an observable that tries to send the sign up step one information to the backend web service, in order to create a user account
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

  /**
   * Returns an observable that tries to send the sign up step two information to the backend web service, in order to validate a user account
   *
   * @param {string} email the email of the user
   * @param {string} code the code for validating the user account
   * @returns {Observable<Object>} the observable object
   */
  stepTwo(email: string, code: string) {
    const bodyParameters = `email=${email}&code=${code}`;
    return this.http
      .post(this.stepTwoUrl, bodyParameters,
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
    const bodyParameters = `username=${username}&name=${organizationName}&uniqueIdentifier=${organizationId}&termsOfServiceAccepted=true`;
    return this.http.post(this.stepThreeUrl, bodyParameters,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true})
      .toPromise();
  }

  /**
   * Returns an observable that tries to send the sign up step four information to the backend web service, in order to send invitations.
   *
   * @param {string} serializedInvitations the serialized invitations to send
   * @returns {Observable<Object>} the observable object
   */
  stepFour(serializedInvitations: string) {
    const bodyParameters = `invitations=${serializedInvitations}`;
    return this.http
      .post(this.stepFourUrl, bodyParameters,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true});
  }

}
