import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OrganizationService} from '@services/organization/organization.service';
import {SkillCategory} from '@model/SkillCategory';

@Component({
  selector: 'app-organization-skills',
  templateUrl: './organization-skills.component.html',
  styleUrls: ['./organization-skills.component.css']
})
export class OrganizationSkillsComponent implements OnInit {

  skillCategories: SkillCategory[] = [];

  constructor(public router: Router, private organizationService: OrganizationService) {
  }

  ngOnInit() {

    this.organizationService.getOrganizationSkills().then(skillCategories => {
      this.parseSkills(skillCategories);
    });

  }

  private parseSkills(skillCategories: any[]) {
    skillCategories.forEach(skillCategory => {

      const skillCategoryModel = new SkillCategory(skillCategory);
      this.skillCategories.push(skillCategoryModel);

    });
  }
}
