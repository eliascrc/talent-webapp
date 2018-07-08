import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";
import { Organization } from '@model/Organization';

@Injectable()
export class OrganizationService {

  private url: string = 'http://ws.talent.cr/ws/login/organization';
  private organizationBasicInfoUrl = 'http://ws.talent.cr/ws/organization/get';
  private organizationSkillsUrl = 'http://ws.talent.cr/ws/organization/skill/get';

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

  /**
   * Returns a promise with the JSON containing the organization's basic information.
   * @returns {Promise<Object>}
   */
  getOrganizationBasicInfo() {
    return this.http.get(this.organizationBasicInfoUrl, {withCredentials: true})
      .toPromise();
  }

  getSkills() {
    return this.http.get(this.organizationSkillsUrl, {withCredentials: true})
      .toPromise();
  }

}
