import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
/**
 * Establishes communication with the backend endpoints regarding a technical resource's related information.
 *
 * @author Josue Leon Sarkis, Maria Jose Cubero
 */
export class ResourceInformationService {

  private getTechnicalResourceBasicInfoUrl = 'http://ws.talent.cr/ws/technicalResource/basicInformation';
  private getTechnicalResourceBasicInfoUrlWithId = 'http://ws.talent.cr/ws/technicalResource/basicInformation/id';
  private getTechnicalResourcesProjects = 'http://ws.talent.cr/ws/technicalResource/project/get?username=';
  private getTechnicalResourcesFeedback = 'http://ws.talent.cr/ws/technicalResource/receivedFeedback/get?technicalResource=';

  constructor(private http: HttpClient) {
  }

  /**
   * Obtains the basic information of a technical resource.
   * @param {string} email
   * @returns {Promise<any>}
   */
  getTechnicalResourceBasicInfo(email: string): Promise<any> {
    return this.http.get<any>(this.getTechnicalResourceBasicInfoUrl, {
      params: {
        'username': email
      },
      withCredentials: true
    }).toPromise();
  }

  /**
   * Obtains the basic information of a technical resource.
   * @param {string} id
   * @returns {Promise<any>}
   */
  getTechnicalResourceBasicInfoWithId(id: string): Promise<any> {
    return this.http.get<any>(this.getTechnicalResourceBasicInfoUrlWithId, {
      params: {
        'id': id
      },
      withCredentials: true
    }).toPromise();
  }

  /**
   * Obtains the active projects of a technical resource.
   * @param {string} id
   * @returns {Promise<any>}
   */
  getTechnicalResourceProjects(username: string): Promise<any> {
    return this.http.get<any>(this.getTechnicalResourcesProjects + username , {
      withCredentials: true
    }).toPromise();
  }

  /**
   * Obtains the feedback of a technical resource.
   * @param {string} username
   * @returns {Promise<any>}
   */
  getTechnicalResourceFeedback(username: string): Promise<any> {
    return this.http.get<any>(this.getTechnicalResourcesFeedback + username , {
      withCredentials: true
    }).toPromise();
  }

}
