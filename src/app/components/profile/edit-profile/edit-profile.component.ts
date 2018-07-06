import {Component, OnInit} from '@angular/core';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {ResourceInformationService} from '@services/technical-resource/resource-information.service';
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
 * @author Renato Mainieri Sáenz
 */
export class EditProfileComponent implements OnInit {

  userId: string;
  firstName: string;
  lastName: string;
  userProfilePicture: string;
  position: string;

  constructor(private router: Router; private authenticateService: AuthenticateService, private activatedRoute: ActivatedRoute) {
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
			  let profilePictureObject = JSON.parse(JSON.stringify(userInfoObject.profilePicture));			  
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

}