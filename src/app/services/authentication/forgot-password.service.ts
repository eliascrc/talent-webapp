import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ForgotPasswordService {

  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) { }

  forgotPassword(email: string): Promise<any> {
    this.headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = `email=${email}`;
    return this.http
      .post('http://localhost:8080/talent/ws/passwordReset/forgotPassword', body, {headers: this.headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  validateToken(token: string): Promise<any> {
    return this.http
      .get('http://localhost:8080/talent/ws/passwordReset/new/?token=' + token, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  resetPassword(token: string, newPassword: string): Promise<any> {
    const body = `newPassword=${newPassword}`;
    return this.http
      .post('http://localhost:8080/talent/ws/passwordReset/reset/?token=' + token, body, {withCredentials: true})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  logUser(): Promise<any> {
    return this.http
      .get('http://localhost:8080/talent/ws/user/authenticated', {withCredentials: true})
      .toPromise()
      .then(this.extractUserData)
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
