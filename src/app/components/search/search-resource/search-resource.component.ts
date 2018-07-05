import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {TechnicalResource} from '@model/TechnicalResource';
import {JobPosition} from '@model/JobPosition';

@Component({
  selector: 'app-search-resource',
  templateUrl: './search-resource.component.html',
  styleUrls: ['./search-resource.component.css']
})
export class SearchResourceComponent implements OnInit {

  public results: TechnicalResource[];
  public searchedWord: string;

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit(searchForm: NgForm) {
    if (searchForm.value.searchBar.length > 2) {

      this.searchedWord = searchForm.value.searchBar;
      document.getElementById('results-for-lbl').style.display = 'block';
      const results = document.getElementsByClassName('search-result');

      for (let i = 0; i < results.length; i++) {
        const element = (results[i] as HTMLElement);
        element.style.display = 'block';
      }

    }
  }

}
