import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";
import { Organization } from '@model/Organization';

@Injectable()
export class OrganizationService {

  private url: string = 'http://ws.talent.cr/ws/login/organization';

  constructor(private http: HttpClient) { }

  /**
   * Returns an observable of type organization for a given organization unique identifier
   * @param uniqueIdentifier the unique identifier of the organization
   */
  getOrganization(uniqueIdentifier: string): Observable<Organization> {
    return this.http.get<Organization>(this.url, {
      params: {
        'uniqueIdentifier': uniqueIdentifier
      }
    });
  }

}
