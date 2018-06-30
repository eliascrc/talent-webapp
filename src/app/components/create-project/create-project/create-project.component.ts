import { Component, OnInit } from '@angular/core';
import {TechnicalResource} from '@model/TechnicalResource';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {Location} from '@angular/common';
import {ProjectService} from '@services/project/project.service';
/*import {ProjectService} from '@services/project/project.service';*/

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {

  model;
  name;
  resources: Set<TechnicalResource>;
  formIsValid: boolean;

  constructor(private authenticateService: AuthenticateService, private projectService: ProjectService, private location: Location) {
    this.resources = new Set<TechnicalResource>();
  }

  ngOnInit() {
    this.authenticateService.getLoggedInUserInfo().then(response => this.resources.add(response));
  }

  onSubmit(description: string): void {
    const startDate = this.model.month + '/' + this.model.day + '/' + this.model.year;
    this.projectService.create(this.name, startDate, this.resources.values().next().value.username, description)
      .subscribe();
  }

  cancel(): void {
    alert(this.resources.size);
    this.location.back();
  }

  validateForm(description: string): void {
    if (this.model != null) {
      this.formIsValid = (this.name.length > 0) && this.model.day != null && this.model.month != null &&
        this.model.year != null && description.length > 0;
    }
  }

}
