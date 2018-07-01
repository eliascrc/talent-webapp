import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project} from '@model/Project';
import {ProjectPosition} from '@model/ProjectPosition';

@Injectable()
export class ProjectService {

  private getPositionsHistory = 'http://ws.talent.cr/ws/organization/project/getHistory';
  private getBasicInformation = 'http://ws.talent.cr/ws/organization/project/get';

  constructor(private http: HttpClient) {
  }

  getProjectBasicInformation(projectId: string): Promise<any> {
    const body = `projectId=${projectId}`;
    return this.http.post<Project>(this.getBasicInformation, body, {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      withCredentials: true
    }).toPromise();
  }

  getProjectPositionsHistory(projectId: string): Promise<any> {
    return this.http.get<any>(this.getPositionsHistory, {
      params: {
        'projectId': projectId
      },
      withCredentials: true
    }).toPromise();
  }

}
