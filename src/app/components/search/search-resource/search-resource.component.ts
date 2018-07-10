import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {TechnicalResource} from '@model/TechnicalResource';
import {JobPosition} from '@model/JobPosition';
import {Router} from '@angular/router';
import {OrganizationService} from '@services/organization/organization.service';

@Component({
  selector: 'app-search-resource',
  templateUrl: './search-resource.component.html',
  styleUrls: ['./search-resource.component.css']
})
export class SearchResourceComponent implements OnInit {

  public searchedWord: string;

  public allOrganizationMembers: OrganizationResource[] = [];
  public matchingOrganizationMembers: OrganizationResource[] = [];

  constructor(public router: Router, private organizationService: OrganizationService) {
  }

  ngOnInit() {

    this.organizationService.getOrganizationMembers().then(resources => {
      this.parseOrganizationMembers(resources);
    }, error => {
    });

  }

  onSubmit(searchForm: NgForm) {
    if (searchForm.value.searchBar.length > 2) {

      this.searchedWord = searchForm.value.searchBar;
      document.getElementById('results-for-lbl').style.display = 'block';
      this.matchingOrganizationMembers = [];

      this.allOrganizationMembers.forEach(member => {

        if (member.name.includes(this.searchedWord)) {
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
      organizationResource.profilePicture = resource.profilePicture.link;
      if (resource.technicalPosition != null) {
        organizationResource.technicalPosition = resource.technicalPosition.capabilityLevel.name + ' ' + resource.technicalPosition.capabilityLevel.capability.name;
      }
      this.allOrganizationMembers.push(organizationResource);
    });
  }

}

/**
 * Used to represent the attributes needed of an organization resource.
 */
class OrganizationResource {

  id: string;
  name: string;
  technicalPosition: string;
  profilePicture: string;
}
