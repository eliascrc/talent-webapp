import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class PrivacyPolicyService {

  headers: Headers;
  options: RequestOptions;

  // angular injects an HttpClient instance through the constructor called http
  constructor(private http: Http) { }

  ngOnInit() {
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getContent(): Promise<any> {
    return this.http
      .get('http://ws.talent.cr/ws/content/privacyPolicy?platform=web', this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res; // .json();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
