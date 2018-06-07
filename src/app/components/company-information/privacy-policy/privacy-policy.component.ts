import { Component, OnInit } from '@angular/core';
import {PrivacyPolicyService} from '../../../services/company-information/privacy-policy.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  htmlSnippet: string;

  constructor(private privacyPolicyService: PrivacyPolicyService) { }

  ngOnInit() {
    this.privacyPolicyService
      .getContent()
      .then(result => this.htmlSnippet = result._body)
      .catch(error => console.log(error));
  }
}
