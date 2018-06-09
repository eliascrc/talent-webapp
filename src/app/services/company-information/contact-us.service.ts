import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
/**
 * Service that processes backend web services requests for the /ws/contactUs resources.
 *
 * @author Josue Leon Sarkis
 */
export class ContactUsService {

  private authenticatedContactUsUrl = 'http://ws.talent.cr/ws/contactUs/authenticated';
  private unauthenticatedContactUsUrl = 'http://ws.talent.cr/ws/contactUs/unauthenticated';

  constructor(private http: HttpClient) {
  }

  /**
   * Returns an observable that tries to send the contact us form information to the backend web service of a user that is not currently
   * logged in.
   *
   * @param {string} firstName
   * @param {String} lastName
   * @param {string} email
   * @param {string} issueType
   * @param {string} issue
   * @returns {Observable<Object>}
   */
  unauthenticatedContactUs(firstName: string, lastName: String, email: string, issueType: string, issue: string) {
    const bodyParameters = `firstName=${firstName}&lastName=${lastName}&email=${email}&issueType=${issueType}&issue=${issue}`;
    return this.http
      .post(this.unauthenticatedContactUsUrl, bodyParameters,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true});
  }

  /**
   * Returns an observable that tries to send the contact us form information to the backend web service of a user that is currently
   * logged in.
   *
   * @param {string} issueType
   * @param {string} issue
   * @returns {Observable<Object>}
   */
  authenticatedContactUs(issueType: string, issue: string) {
    const bodyParameters = `issueType=${issueType}&issue=${issue}`;
    return this.http
      .post(this.authenticatedContactUsUrl, bodyParameters,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true});
  }

}
