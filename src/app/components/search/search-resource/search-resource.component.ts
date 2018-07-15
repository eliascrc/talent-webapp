import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {OrganizationService} from '@services/organization/organization.service';
import {Observable} from 'rxjs/Observable';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-search-resource',
  templateUrl: './search-resource.component.html',
  styleUrls: ['./search-resource.component.css']
})
export class SearchResourceComponent implements OnInit {

  public searchedWord: string;
  public allOrganizationMembers: OrganizationResource[] = [];
  public matchingOrganizationMembers: OrganizationResource[] = [];
  public resourcesNames: string[] = [];

  constructor(public router: Router, private organizationService: OrganizationService) {
  }

  ngOnInit() {

    this.organizationService.getOrganizationMembersForSearch().then(resources => {
      this.parseOrganizationMembers(resources);
    }, error => {
    });

  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.resourcesNames.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  onSubmit(searchForm: NgForm, event) {


    if (searchForm.value.searchBar.length >= 2) {

      this.searchedWord = event === null ? searchForm.value.searchBar : event.item;
      document.getElementById('results-for-lbl').style.display = 'block';
      this.matchingOrganizationMembers = [];

      this.allOrganizationMembers.forEach(member => {

        if (member.name.toLowerCase().indexOf(this.searchedWord.toLowerCase()) > -1) {
          this.matchingOrganizationMembers.push(member);
        }

      });

    }
  }

  /**
   * Parses the JSON object received to display all members and their basic information.
   * @param {any[]} organizationMembers
   */
  parseOrganizationMembers(organizationMembers: any[]) {

    organizationMembers.forEach(resource => {

      const organizationResource = new OrganizationResource();
      organizationResource.id = resource.id;
      organizationResource.name = resource.firstName + ' ' + resource.lastName;
      this.resourcesNames.push(organizationResource.name);

      organizationResource.profilePicture = resource.profilePicture.link;

      if (resource.technicalPosition != null) {
        organizationResource.technicalPosition = resource.technicalPosition;
      }

      if (resource.projects != null) {
        resource.projects.forEach(project => {
          organizationResource.projects += project + ' ';
        });
      }

      if (resource.skills != null) {
        resource.skills.forEach(skill => {
          organizationResource.skills += skill.name + ' ';
        });
      }

      this.allOrganizationMembers.push(organizationResource);
    });
  }

  onGoToProfile(id: string) {
    this.router.navigate(['/profile/user-profile/' + id]);
  }
}

/**
 * Used to represent the attributes needed of an organization resource.
 */
class OrganizationResource {

  id = '';
  name = '';
  technicalPosition = '';
  profilePicture = '';
  skills = '';
  projects = '';
}
