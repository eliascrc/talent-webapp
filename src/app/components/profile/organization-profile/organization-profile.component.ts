import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.css']
})
export class OrganizationProfileComponent implements OnInit {

  organizationLoaded = true;
  organizationLogo = '';

  constructor() { }

  ngOnInit() {
  }

}
