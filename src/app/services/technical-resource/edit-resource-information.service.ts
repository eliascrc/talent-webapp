import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';

@Injectable()
/**
 * Establishes communication with the backend endpoints editing a technical resource's basic information.
 *
 * @author Renato Mainieri Saenz
 */
export class EditResourceInformationService {

  private editTechnicalResourceBasicInfoUrl: string = 'http://ws.talent.cr/ws/technicalResource/basicInformation/edit';
  private uploadProfilePictureUrl: string = 'http://ws.talent.cr/ws/profilePicture/upload';
  private headers: Headers;

  constructor(private http: Http) { }

  /**
   * Edits the basic information of a technical resource.
   * @param {string} technicalResourceId
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} nickname
   * @returns {Promise<any>}
   */
  editTechnicalResourceBasicInfo(technicalResourceId: string, firstName: string, lastName: string, nickname: string): Promise<any> {
    this.headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
	const body = `technicalResourceId=${technicalResourceId}&firstName=${firstName}&lastName=${lastName}&nickname=${nickname}`;
	return this.http.
	post(this.editTechnicalResourceBasicInfoUrl, body, {headers: this.headers, withCredentials: true}).
	toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  
  /**
   * Change the profile picture of a technical resource.
   * @param {File} file
   * @returns {Promise<any>}
   */
  uploadProfilePicture(file: File): Promise<any>{
	let formData = new FormData();
	formData.append('file', file);
    return this.http
      .post(this.uploadProfilePictureUrl, formData, {withCredentials: true})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
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