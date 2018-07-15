import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Organization} from '@model/Organization';

@Injectable()
export class OrganizationService {

  private url = 'http://ws.talent.cr/ws/login/organization';
  private organizationBasicInfoUrl = 'http://ws.talent.cr/ws/organization/get';
  private getOrganizationSkillsUrl = 'http://ws.talent.cr/ws/organization/skill/get';
  private createOrganizationSkillsUrl = 'http://ws.talent.cr/ws/organization/skill/create';
  private organizationProjectsUrl = 'http://ws.talent.cr/ws/organization/project/getProjects';
  private organizationMembersUrl = 'http://ws.talent.cr/ws/organization/technicalResource/getAll';
  private organizationMembersForSearchUrl = 'http://ws.talent.cr/ws/organization/technicalResource/searchResults';
  private organizationCapabilitiesUrl = 'http://ws.talent.cr/ws/organization/capabilities/getAll';

  constructor(private http: HttpClient) {
  }

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

  getOrganizationSkills(): Promise<any> {
    return this.http.get(this.getOrganizationSkillsUrl, {withCredentials: true}).toPromise();
  }

  createOrganizationSkills(skillCategoryId: string, skillName: string, skillType: string) {
    const bodyParameters = `skillCategoryId=${skillCategoryId}&skillName=${skillName}&skillType=${skillType}`;
    return this.http.post(this.createOrganizationSkillsUrl, bodyParameters,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true}).toPromise();
  }

  /**
   * Returns a promise with the JSON containing the organization's projects.
   * @returns {Promise<Object>}
   */
  getOrganizationProjects(): Promise<any> {
    return this.http.get(this.organizationProjectsUrl, {withCredentials: true}).toPromise();
  }

  /**
   * Returns a promise with the JSON containing the organization's members.
   * @returns {Promise<Object>}
   */
  getOrganizationMembers(): Promise<any> {
    return this.http.get(this.organizationMembersUrl, {withCredentials: true}).toPromise();
  }

  getOrganizationMembersForSearch(): Promise<any> {
    return this.http.get(this.organizationMembersForSearchUrl, {withCredentials: true}).toPromise();
  }

  /**
   * Returns a promise with the JSON containing the organization's capabilities.
   * @returns {Promise<any>}
   */
  getOrganizationCapabilities(): Promise<any> {
    return this.http.get(this.organizationCapabilitiesUrl, {withCredentials: true}).toPromise();
  }

}
