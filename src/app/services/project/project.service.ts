import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Project} from '@model/Project';

@Injectable()
export class ProjectService {

  private createUrl = 'http://ws.talent.cr/ws/organization/project/create';

  constructor(private http: HttpClient) { }

  /**
   * Used to create a project with the given information
   * @param {string} name the name of the project
   * @param {string} startDate the start date of the project
   * @param {string} projectLead the project lead's username
   * @param {string} description a brief description of the project
   * @returns {Observable<Object>}
   */
  create(name: string, startDate: string, projectLead: string, description: string): Observable<Project> {
    const bodyParameters = `name=${name}&startDate=${startDate}&projectLead=${projectLead}&description=${description}`;
    alert(bodyParameters);
    return this.http
      .post<Project>(this.createUrl, bodyParameters,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true});
  }

}
