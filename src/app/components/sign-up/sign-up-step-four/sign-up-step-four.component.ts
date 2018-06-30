import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Invitation} from '@model/Invitation';
import {InvitationInput} from './InvitationInput';

@Component({
  selector: 'app-sign-up-step-four',
  templateUrl: './sign-up-step-four.component.html',
  styleUrls: ['./sign-up-step-four.component.css']
})
export class SignUpStepFourComponent implements OnInit {

  invitations: InvitationInput[];
  idCounter: number;

  constructor() {
    this.idCounter = 0;
    this.invitations = [];
    this.newInvitationInput();
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    for (let i = 0; i < this.invitations.length; i++) {
      console.log(form.value['firstName' + i] + form.value['lastName' + i] + form.value['email' + i]);
    }
  }

  newInvitationInput() {
    this.invitations.push(new InvitationInput(this.idCounter));
    this.idCounter++;
  }
}
