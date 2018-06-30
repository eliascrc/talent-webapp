import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Invitation} from '@model/Invitation';
import {InvitationInput} from './InvitationInput';
import {Invitations} from './Invitations';
import {SignupService} from '@services/sign-up/signup.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-sign-up-step-four',
  templateUrl: './sign-up-step-four.component.html',
  styleUrls: ['./sign-up-step-four.component.css']
})
export class SignUpStepFourComponent implements OnInit {

  invitationsInput: InvitationInput[];
  idCounter: number;
  errorMessage: string;

  constructor(public router: Router, public signUpService: SignupService) {
    this.idCounter = 0;
    this.invitationsInput = [];
    this.newInvitationInput();
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let any: any;
    const invitationsArray: Invitation[] = [];
    let invitationsToSend: Invitations;

    for (let i = 0; i < this.invitationsInput.length; i++) {

      any = {};
      any.email = form.value['email' + i];
      any.firstName = form.value['firstName' + i];
      any.lastName = form.value['lastName' + i];
      any.token = null;
      any.isValid = true;
      any.organization = null;
      any.entityCreationTimestamp = new Date();
      any.entityVersion = 1;
      any.id = null;
      any.lastUpdatedTimestamp = new Date;
      invitationsArray.push(new Invitation(any));

    }

    any = {};
    any.invitations = invitationsArray;
    invitationsToSend = new Invitations(any);
    console.log(JSON.stringify(invitationsToSend));

    this.signUpService.stepFour(JSON.stringify(invitationsToSend)).subscribe(() => {

      this.router.navigate(['/dashboard']);

    }, error => {
      const httpError: HttpErrorResponse = (error as HttpErrorResponse);
      if (httpError.status === 401) {
        this.router.navigate(['/dashboard']);
      } else if (httpError.status === 409 && httpError.error === 'LimitOfInvitationsReached') {
        this.errorMessage = 'Limit of invitations has been reached!';
      } else if (httpError.status === 409 && httpError.error === 'AlreadyRegisteredUser') {
        this.errorMessage = 'One of the users you\'re trying to invite is already registered!';
      }
    });
  }

  newInvitationInput() {
    this.invitationsInput.push(new InvitationInput(this.idCounter));
    this.idCounter++;
  }
}
