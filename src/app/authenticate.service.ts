import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticateService {
  mockLoginStatus: boolean = false;
  constructor() { }
  login() {
    this.mockLoginStatus = true;	  
  }
  
  logout() {
    this.mockLoginStatus = false;	  
  }
}
