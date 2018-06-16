import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();
  hamburgerClicked = false;

  constructor() { }

  ngOnInit() {
  }

  onHamburgerClick() {
    this.hamburgerClicked = !this.hamburgerClicked;
    this.notify.emit(this.hamburgerClicked);
  }




}
