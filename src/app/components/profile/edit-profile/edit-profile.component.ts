import {Component, OnInit} from '@angular/core';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {ResourceInformationService} from '@services/technical-resource/resource-information.service';
import {ActivatedRoute, Route} from '@angular/router';
import {EditResourceInformationService} from '@services/technical-resource/edit-resource-information.service';
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
  firstName: string;
  lastName: string;
  nickname: string;
  userProfilePicture: string;
  position: string;
  saving: boolean;
  buttonMessage: string = "Save";

  constructor(private router: Router, private authenticateService: AuthenticateService, private editResourceInformationService: EditResourceInformationService, private activatedRoute: ActivatedRoute) {
  }

  /**
   * Data querying of the user basic information.
   */
  ngOnInit() {
	  this.authenticateService.getLoggedInUserInfo().then(userInfo => {
              const userInfoObject = JSON.parse(JSON.stringify(userInfo));
              this.userId = userInfoObject.id;
			  this.firstName = userInfoObject.firstName;
			  this.lastName = userInfoObject.lastName;
			  this.nickname = userInfoObject.nickname;
			  const profilePictureObject = JSON.parse(JSON.stringify(userInfoObject.profilePicture));			  
			  this.userProfilePicture = profilePictureObject.link;
       });
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
	if (form.value.firstNameInput != "") {		
	  this.firstName = form.value.firstNameInput;
	}
	if (form.value.lastNameInput != "") {		
	  this.lastName = form.value.lastNameInput;
	}
	if (form.value.nicknameInput != "") {		
	  this.nickname = form.value.nicknameInput;
	}	
	this.editResourceInformationService.editTechnicalResourceBasicInfo(this.userId, this.firstName, this.lastName, this.nickname).
	then(response => { }).catch(this.saving=false; this.buttonMessage = "Save");
  }
}