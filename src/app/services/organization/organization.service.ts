import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";
import { Organization } from '@model/Organization';

@Injectable()
export class OrganizationService {

  private url: string = 'http://ws.talent.cr/ws/login/organization';

  constructor(private http: HttpClient) { }

  getOrganization(uniqueIdentifier: string): Observable<Organization> {
    return this.http.get<Organization>(this.url, {
      params: {
        'uniqueIdentifier': uniqueIdentifier
      }
    });
  }

}
