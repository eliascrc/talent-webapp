import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Invitation} from '@model/Invitation';
import {InvitationInput} from './InvitationInput';
import {Invitations} from './Invitations';

@Component({
  selector: 'app-sign-up-step-four',
  templateUrl: './sign-up-step-four.component.html',
  styleUrls: ['./sign-up-step-four.component.css']
})
export class SignUpStepFourComponent implements OnInit {

  invitationsInput: InvitationInput[];
  idCounter: number;

  constructor() {
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
      invitationsArray.push(new Invitation(any));

    }

    any = {};
    any.people = invitationsArray;
    invitationsToSend = new Invitations(any);
  }

  newInvitationInput() {
    this.invitationsInput.push(new InvitationInput(this.idCounter));
    this.idCounter++;
  }
}
