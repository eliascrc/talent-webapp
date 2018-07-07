import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
/**
 * Establishes communication with the backend endpoints editing a technical resource's basic information.
 *
 * @author Renato Mainieri Saenz
 */
export class EditResourceInformationService {

  private editTechnicalResourceBasicInfoUrl = 'http://ws.talent.cr/ws/technicalResource/basicInformation/edit';
  private headers: Headers;
  private options: RequestOptions;

  constructor(private http: Http) { }

  /**
   * Edits the basic information of a technical resource.
   * @param {string} email
   * @returns {Promise<any>}
   */
  editTechnicalResourceBasicInfo(technicalResourceId: string, firstName: string, lastName: string, nickname: string): Promise<any> {
    this.headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = `technicalResourceId=${technicalResourceId}&firstName=${firstName}&lastName=${lastName}&nickname=${nickname}`;
    return this.http
      .post(this.editTechnicalResourceBasicInfoUrl, body, {headers: this.headers, withCredentials: true})
      .toPromise();
  }
  
  private extractData(res: Response) {
    return res || {};
  }

  private extractUserData(res: Response) {
    return res.json() || {};
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
