import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Project} from '@model/Project';


/**
 *  Service that processes web services related to projects
 *
 *  @author Daniel Montes de Oca, Josue Leon Sarkis
 */
@Injectable()
export class ProjectService {

  private getPositionsHistoryUrl = 'http://ws.talent.cr/ws/organization/project/getHistory';
  private getBasicInformationUrl = 'http://ws.talent.cr/ws/organization/project/get';
  private createUrl = 'http://ws.talent.cr/ws/organization/project/create';
  private getActiveProjectsUrl = 'http://ws.talent.cr/ws/organization/project/getActiveProjects';

  constructor(private http: HttpClient) {
  }

  /**
   * Used to create a project with the given information
   * @param {string} name the name of the project
   * @param {string} startDate the start date of the project
   * @param {string} projectLead the project lead's username
   * @param {string} description a brief description of the project
   * @returns {Observable<Project>} a project object with the project information
   */
  create(name: string, startDate: string, projectLead: string, description: string): Observable<Project> {
    const bodyParameters = `name=${name}&startDate=${startDate}&projectLead=${projectLead}&description=${description}`;
    return this.http
      .post<Project>(this.createUrl, bodyParameters,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true});
  }

  /**
   * Obtains a project's basic information.
   * @param {string} projectId
   * @returns {Promise<any>}
   */
  getProjectBasicInformation(projectId: string): Promise<any> {
    const body = `projectId=${projectId}`;
    return this.http.post<Project>(this.getBasicInformationUrl, body, {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      withCredentials: true
    }).toPromise();
  }

  /**
   * Obtains the project's positions holders history.
   * @param {string} projectId
   * @returns {Promise<any>}
   */
  getProjectPositionsHistory(projectId: string): Promise<any> {
    return this.http.get<any>(this.getPositionsHistoryUrl, {
      params: {
        'projectId': projectId
      },
      withCredentials: true
    }).toPromise();
  }

  /**
   * Obtains the organization's active projects.
   * @returns {Promise<any>}
   */
  getActiveProjects(): Promise<any> {
    return this.http.get<any>(this.getActiveProjectsUrl, {
      withCredentials: true
    }).toPromise();
  }

  getProjectLead(projectId: string): Promise<any> {
    return this.http.get<any>(this.getBasicInformationUrl, {
      params: {
        'projectId': projectId
      },
      withCredentials: true
    }).toPromise().then( () => alert('asdf'));
  }

}
