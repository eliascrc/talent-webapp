import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '@services/organization/organization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization-select',
  templateUrl: './organization-select.component.html',
  styleUrls: ['./organization-select.component.css']
})
export class OrganizationSelectComponent implements OnInit {

  private error: boolean;

  constructor(private organizationService: OrganizationService, private router: Router) {
    this.error = false;
  }

  ngOnInit() {
  }

  redirectToOrganization(uniqueIdentifier: string): void {
    this.organizationService.getOrganization(uniqueIdentifier)
      .subscribe(response => {
        this.error = false;
        this.router.navigate(['login', response.uniqueIdentifier]);
      }, () => this.error = true
      )
  }

}
