import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-profile',
  templateUrl: './project-profile.component.html',
  styleUrls: ['./project-profile.component.css']
})
export class ProjectProfileComponent implements OnInit {

  projectResources: string[] = ['josue', 'maria', 'fabian', 'pedro', 'bob'];
  projectPositions: string[] = ['java', 'c#', 'ruby'];

  constructor() { }

  ngOnInit() {
  }

}
