import {Component, OnInit} from '@angular/core';
import {AuthenticateService} from '@services/authentication/authenticate.service';
import {ActivatedRoute, Route} from '@angular/router';

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
  name: string;
  userProfilePicture: string;
  loggedIn = false;
  position: string;
  canEdit: boolean;

  constructor(private authenticateService: AuthenticateService, private activatedRoute: ActivatedRoute) {
  }

  /**
   * Data querying of the users profile information.
   */
  ngOnInit() {
  }

}