import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project} from '@model/Project';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FeedbackService {

  private giveKudoUrl = 'http://ws.talent.cr/ws/organization/feedback/create/kudo';
  private giveWarningUrl = 'http://ws.talent.cr/ws/organization/feedback/create/warning';

  constructor(private http: HttpClient) {
  }

  giveKudo(description: string, observeeUsername: string, projectId: string): Observable<any> {
    const bodyParameters = `description=${description}&observee=${observeeUsername}&projectId=${projectId}`;
    return this.http
      .post(this.giveKudoUrl, bodyParameters,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true});
  }

  giveWarning(description: string, observeeUsername: string, projectId: string): Observable<any> {
    const bodyParameters = `description=${description}&observee=${observeeUsername}&projectId=${projectId}`;
    return this.http
      .post(this.giveWarningUrl, bodyParameters,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true});
  }

}
