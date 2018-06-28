import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SignupService {

  private stepOneUrl = 'http://ws.talent.cr/ws/signUp/stepOne';

  constructor(private http: HttpClient) { }

  stepOne(firstName: string, lastName: string, email: string, password: string) {
    const bodyParameters = `firstName=${firstName}&lastName=${lastName}&email=${email}&password=${password}`;
    return this.http
      .post(this.stepOneUrl, bodyParameters,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true});
  }

}
