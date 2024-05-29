import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public name: string = "";

  constructor(public authService : AuthService, public router : Router) {
  }

  logout(){
    this.authService.logout();

  }

  ngOnInit(): void {
    this.authService.loadToken();
    if (this.authService.getToken() == null || this.authService.isTokenExpired())
    this.router.navigate (  ['header/login']);
    this.name = localStorage.getItem("user")!;
    console.log(this.name);
  }

  protected readonly localStorage = localStorage;
}
