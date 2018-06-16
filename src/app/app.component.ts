import {Component, OnInit} from '@angular/core';
import {AuthenticateService} from '@services/authentication/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Talent Web Platform';
  loggedIn = false;
  sidebarChange = false;

  constructor(private authenticateService: AuthenticateService) {}

  ngOnInit() {
    this.authenticateService.isLoggedIn()
      .then(response => {
          this.loggedIn = response;
        }
      );
  }

  onSidebarChanged(sidebarChanged: boolean) {
    this.sidebarChange = sidebarChanged;
  }
}
