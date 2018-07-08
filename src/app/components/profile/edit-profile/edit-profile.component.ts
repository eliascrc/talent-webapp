import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {ResourceInformationService} from '@services/technical-resource/resource-information.service';
import {EditResourceInformationService} from '@services/technical-resource/edit-resource-information.service';
import {ActivatedRoute, Route} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

/**
 * Edit profile component which displays the technical resource basic information, profile picture,
 * name, position, technical manager and technical manager.
 *
 * @author Renato Mainieri Saenz
 */
export class EditProfileComponent implements OnInit {

  userId: string;
  isAdmistrator: boolean;
  firstName: string;
  lastName: string;
  nickname: string;
  userProfilePicture: string;
  position: string;
  saving: boolean;
  isAuthorized: boolean = false;
  validFile: boolean = true;
  buttonMessage: string = "Save";
  file: File;
  fileName: string;

  constructor(private router: Router, private authenticateService: AuthenticateService, private resourceInformationService: ResourceInformationService,
				private editResourceInformationService: EditResourceInformationService, private activatedRoute: ActivatedRoute) {
  }

  /**
   * Data querying of the user basic information.
   */
  ngOnInit() {
	  this.activatedRoute.params.subscribe(param => {
      this.userId = param['userId'];});
	  this.authenticateService.getLoggedInUserInfo().then(userInfo => {
              const userInfoObject = JSON.parse(JSON.stringify(userInfo));
              let id = userInfoObject.id;
			  this.isAdmistrator = userInfoObject.administrator;
			  if (this.isAdmistrator || this.userId == id) {
				  this.isAuthorized = (this.userId == id);
				  this.resourceInformationService.getTechnicalResourceBasicInfoWithId(this.userId)
				  .then(userInfo => {
					  this.firstName = userInfo.firstName;
					  this.lastName = userInfo.lastName;
					  this.nickname = userInfo.nickname;
					  const technicalPosition = JSON.parse(JSON.stringify(userInfo.technicalPosition));	
					  const capabilityLevel = JSON.parse(JSON.stringify(technicalPosition.capabilityLevel));	
					  const capability = JSON.parse(JSON.stringify(capabilityLevel.capability));
					  this.position = capabilityLevel.name.concat(' ').concat(capability.name);
					  const profilePictureObject = JSON.parse(JSON.stringify(userInfo.profilePicture));			  
					  this.userProfilePicture = profilePictureObject.link;
				  });
			  }
			  else {
				  this.onCancelButton();
			  }
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
	let dir = '/profile/user-profile/';
    dir = dir.concat(this.userId);
    this.router.navigate([dir]);
  }

  /**
   * Sends the user to the user-profile page.
   */
  onSubmit(form: NgForm) {
	this.saving = true;
	this.buttonMessage = "Working...";
	// Check if the firstName was modified
	if (form.value.firstNameInput != "") {		
	  this.firstName = form.value.firstNameInput;
	}
	// Check if the lastName was modified
	if (form.value.lastNameInput != "") {		
	  this.lastName = form.value.lastNameInput;
	}
	// Check if the nickname was modified
	if (form.value.nicknameInput != "") {		
	  this.nickname = form.value.nicknameInput;
	}	
    // Check if a profile picture was added
	if(this.file != null){
		this.editResourceInformationService.uploadProfilePicture(this.file);
	}
	
	this.editResourceInformationService.editTechnicalResourceBasicInfo(this.userId, this.firstName, this.lastName, this.nickname).
	catch(error => {this.saving=false; this.buttonMessage = "Save"}).
	then(response => {this.onCancelButton();});
  }
}