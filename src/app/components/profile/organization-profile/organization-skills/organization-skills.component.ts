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

  addSkill() {
    const addButton = (document.getElementById('add-skill-btn') as HTMLButtonElement);
    addButton.disabled = true;

    const skillTypeInput = (document.getElementById('skill-type-dropdown') as HTMLSelectElement);
    const skillCategoryInput = (document.getElementById('skill-category-dropdown') as HTMLSelectElement);
    const skillTextInput = (document.getElementById('new-skill') as HTMLInputElement);

    const skillType = skillTypeInput.options[skillTypeInput.selectedIndex].value;
    const skillCategory = skillCategoryInput.options[skillCategoryInput.selectedIndex].value;
    const newSkill = skillTextInput.value;

    if (newSkill !== '') {
      this.organizationService.createOrganizationSkills(skillCategory, newSkill, skillType).then(response => {

        this.skillCategories = [];

        this.organizationService.getOrganizationSkills().then(skillCategories => {
          this.parseSkills(skillCategories);
          addButton.disabled = false;
        });

        document.getElementById('error-message').classList.remove('visible');

      }, () => {
        document.getElementById('error-message').classList.add('visible');
        addButton.disabled = false;
      });
    }
  }
}
