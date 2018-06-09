import { Component, OnInit } from '@angular/core';
import {TermsOfUseService} from '../../../services/company-information/terms-of-use.service';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.css']
})
export class TermsOfUseComponent implements OnInit {

  htmlSnippet: string;

  constructor(private termsOfUseService: TermsOfUseService) { }

  ngOnInit() {
    this.termsOfUseService
      .getContent()
      .then(result => this.htmlSnippet = result._body)
      .catch(error => console.log(error));
  }
}
