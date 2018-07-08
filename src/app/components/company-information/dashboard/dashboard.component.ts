import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {OrganizationService} from '@services/organization/organization.service';
import {ProjectService} from '@services/project/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
/**
 * Dashboard page for logged-in users. It displays the main search bar, the newest organization members and the list of
 * active projects and their basic information.
 *
 * @author Josué León Sarkis
 */
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private organizationService: OrganizationService, private projectService: ProjectService) { }

  ngOnInit() {

  }

}
