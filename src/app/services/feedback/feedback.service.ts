import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project} from '@model/Project';
import {Observable} from 'rxjs/Observable';

/**
 * Service for feedback-related operations
 */
@Injectable()
export class FeedbackService {

  private giveKudoUrl = 'http://ws.talent.cr/ws/organization/feedback/create/kudo';
  private giveWarningUrl = 'http://ws.talent.cr/ws/organization/feedback/create/warning';

  constructor(private http: HttpClient) {
  }

  /**
   * Used to give a kudo to a technical reosource
   * @param {string} description the description of the feedback
   * @param {string} observeeUsername the username of the resource that will receive the feedback
   * @param {string} projectId the id of the project in which the observer and observee worked together
   * @returns {Observable<any>} an observable of the web service's response
   */
  giveKudo(description: string, observeeUsername: string, projectId: string): Observable<any> {
    const bodyParameters = `description=${description}&observee=${observeeUsername}&projectId=${projectId}`;
    return this.http
      .post(this.giveKudoUrl, bodyParameters,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true});
  }

  /**
   * Used to give a warning to a technical reosource
   * @param {string} description the description of the feedback
   * @param {string} observeeUsername the username of the resource that will receive the feedback
   * @param {string} projectId the id of the project in which the observer and observee worked together
   * @returns {Observable<any>} an observable of the web service's response
   */
  giveWarning(description: string, observeeUsername: string, projectId: string): Observable<any> {
    const bodyParameters = `description=${description}&observee=${observeeUsername}&projectId=${projectId}`;
    return this.http
      .post(this.giveWarningUrl, bodyParameters,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true});
  }

}
