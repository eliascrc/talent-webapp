import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {OrganizationService} from '@services/organization/organization.service';

@Component({
  selector: 'app-organization-skills',
  templateUrl: './organization-skills.component.html',
  styleUrls: ['./organization-skills.component.css']
})
export class OrganizationSkillsComponent implements OnInit {

  constructor(public router: Router, private organizationService: OrganizationService) { }

  ngOnInit() {

    this.organizationService.getSkills().then( skillCategories => {

    });

  }

}
