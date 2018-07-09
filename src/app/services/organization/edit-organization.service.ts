import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';

@Injectable()
/**
 * Establishes communication with the backend endpoints editing a organization basic information.
 *
 * @author Renato Mainieri Saenz
 */
export class EditOrganizationService {
	
  private editTechnicalResourceBasicInfoUrl: string = '';
  private uploadOrganizationLogoUrl: string = 'http://ws.talent.cr/ws/organizationLogo/upload';
  private headers: Headers;

  constructor(private http: Http) { }
  
  /**
   * Change the logo of a organization.
   * @param {File} file
   * @returns {Promise<any>}
   */
  uploadOrganizationLogo(file: File): Promise<any>{
	let formData = new FormData();
	formData.append('file', file);
    return this.http
      .post(this.uploadOrganizationLogoUrl, formData, {withCredentials: true})
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
