import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {OrganizationService} from '@services/organization/organization.service';
import {EditOrganizationService} from '@services/organization/edit-organization.service';
import {ActivatedRoute, Route} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-organization-profile',
  templateUrl: './edit-organization-profile.component.html',
  styleUrls: ['./edit-organization-profile.component.css']
})

/**
 * Edit organization component which displays the organization basic information, organization name,
 * unique identifier and logo.
 *
 * @author Renato Mainieri Saenz
 */
export class EditOrganizationProfileComponent implements OnInit {

  isAdministrator: boolean;
  organizationName: string;
  uniqueIdentifier: string;
  organizationLogo: string;
  saving: boolean;
  validFile: boolean = true;
  organizationLoaded: boolean;
  buttonMessage: string = "Save";
  file: File;
  fileName: string;

  constructor(private router: Router, private authenticateService: AuthenticateService, private editOrganizationService: EditOrganizationService,
				private activatedRoute: ActivatedRoute, private organizationService: OrganizationService) {
  }

  /**
   * Data querying of the user basic information.
   */
  ngOnInit() {
	  
	this.authenticateService.getLoggedInUserInfo().then(response => {
      const userInfoObject = JSON.parse(JSON.stringify(response));
      this.isAdministrator = userInfoObject.administrator;
	  if (this.isAdministrator) {
		this.organizationService.getOrganizationBasicInfo().then(orgBasicInfo => {
		  const orgBasicInfoObject = JSON.parse(JSON.stringify(orgBasicInfo));
		  this.organizationLogo = orgBasicInfoObject.logo;
		  this.organizationName = orgBasicInfoObject.name;
		  this.uniqueIdentifier = orgBasicInfoObject.uniqueIdentifier;
		}, error => {
		});   
		this.organizationLoaded = true;  
	  }
	  else {
		this.onCancelButton();
	  }
    }, error => {
    });
  }
  
  /**
   * Validate that the extension of the file is valid (jpg).
   */
  uploadFile(event: EventTarget) {
	let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
	let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
	let files: FileList = target.files;
	this.file = files[0];
	this.fileName = this.file.name;
	if (this.file.type != "image/jpeg") {
		this.validFile = false;
	}
	else {
		this.validFile = true;
	}
  }
  
  /**
   * Sends the user to the user-profile page.
   */
  onCancelButton() {
    this.router.navigate(['/organization-profile/']);
  }

  /**
   * Sends the user to the user-profile page.
   */
  onSubmit(form: NgForm) {
	this.saving = true;
	this.buttonMessage = "Working...";
	// Check if the organizationName was modified
	if (form.value.organizationNameInput != "") {		
	  this.organizationName = form.value.organizationNameInput;
	}
	// Check if the uniqueIdentifier was modified
	if (form.value.uniqueIdentifierInput != "") {		
	  this.uniqueIdentifier = form.value.uniqueIdentifierInput;
	}
    // Check if a organizationLogo was added
	if(this.file != null){
		this.editOrganizationService.uploadOrganizationLogo(this.file);
	}
	
  }
}
