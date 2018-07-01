import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class InvitationService {

  private validateTokenUrl: string = 'http://ws.talent.cr/ws/acceptInvitation/validate/?token=';
  private acceptInvitationUrl: string = 'http://ws.talent.cr/ws/acceptInvitation/accept/?token=';
  private headers: Headers;
  private options: RequestOptions;

  constructor(private http: Http) { }

  validateToken(token: string): Promise<any> {
    return this.http
      .get(this.validateTokenUrl + token, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  
  acceptInvite(token: string, nickname: string, password: string): Promise<any> {
	this.headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = `nickname=${nickname}&password=${password}`;
    return this.http
      .post(this.acceptInvitationUrl + token, body, {headers: this.headers, withCredentials: true})
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
