import { Component, OnInit } from '@angular/core';
import {TechnicalResource} from '@model/TechnicalResource';
import {AuthenticateService} from '@services/authentication/authenticate.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {

  model;
  resources: Set<TechnicalResource>;

  constructor(private authenticateService: AuthenticateService) {
    this.resources = new Set<TechnicalResource>();
  }

  ngOnInit() {
    this.authenticateService.getLoggedInUserInfo().then(response => this.resources.add(response));
  }

  updateDate() {
    alert(this.resources.size);
  }

}
