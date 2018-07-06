import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProjectPositionService {

  private getResourceProjectPosition = 'http://ws.talent.cr/ws/projectPosition/get?technicalResource=';

  constructor(private http: HttpClient) { }

  /**
   * Obtains the project position of a technical resource in a project.
   * @param {string} id
   * @returns {Promise<any>}
   */
  getTechnicalResourceProjectPosition(username: string, projectId: string): Promise<any> {
    return this.http.get<any>(this.getResourceProjectPosition + 'jolesa97@gmail.com' + '?projectId=' + '40288188-645e6438-0164-5e65e9a5-0070', {
      withCredentials: true
    }).toPromise();
  }
}
