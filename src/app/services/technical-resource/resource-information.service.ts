import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
/**
 * Establishes communication with the backend endpoints regarding a technical resource's related information.
 *
 * @author Josue Leon Sarkis
 */
export class ResourceInformationService {

  private getTechnicalResourceBasicInfoUrl = 'http://ws.talent.cr/ws/technicalResource/basicInformation';

  constructor(private http: HttpClient) { }

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

}
