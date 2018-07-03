import { Component, OnInit } from '@angular/core';
import {TechnicalResource} from '@model/TechnicalResource';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {Location} from '@angular/common';
import {ProjectService} from '@services/project/project.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
/**
 * Component used for creating projects
 *
 * @author Daniel Montes de Oca
 */
export class CreateProjectComponent implements OnInit {

  model;
  name;
  resources: Set<TechnicalResource>;
  formIsValid: boolean;
  error: boolean;

  constructor(private authenticateService: AuthenticateService, private projectService: ProjectService, private location: Location,
              private router: Router) {
    this.resources = new Set<TechnicalResource>();
    this.error = false;  // used to specify that there was an error while creating the project
  }

  ngOnInit() {
    this.authenticateService.getLoggedInUserInfo().then(response => this.resources.add(response));
  }

  /**
   * Used to submit the form that contains the information given to the project
   * @param {string} description a brief description of the project
   */
  onSubmit(description: string): void {
    const startDate = this.model.year + '-' + this.model.month + '-' + this.model.day;
    this.projectService.create(this.name, startDate, this.resources.values().next().value.username, description)
      .subscribe(response =>
          this.router.navigate(['project-profile', response.id]) // navigates to a page with the created project's information
        , error => this.error = true);
  }

  /**
   * Used to cancel the creation of the project, returns the user to the previous page they were in
   */
  cancel(): void {
    this.location.back();
  }

  /**
   * Used to check if the form is ready to be submitted
   * @param {string} description a brief description of the project entered by the user
   */
  validateForm(description: string): void {
    if (this.model != null) {
      this.formIsValid = (this.name.length > 0) && this.model.day != null && this.model.month != null &&
        this.model.year != null && description.length > 0;
    }
  }

}
