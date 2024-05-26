import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {UserModel} from "../../models/user.model";
import {Observable} from "rxjs";


export const BASIC_URL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private helper = new JwtHelperService()
  token! : string

  public loggedUser! : string; //stocke le user connecté
  public isloggedIn : Boolean = false; //si user est connecté ou non
  public roles! : string[]; //stocke les rôles du user connecté

constructor(private router: Router, private httpClient: HttpClient) {}

  login(user: UserModel){
    return this.httpClient.post<UserModel>(  'http://localhost:8080/login', user,  {observe: 'response'})
  }

  saveToken (jwt: string): void{
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodedJWT();
    }

    getToken(){
      return this.token;
    }

  decodedJWT(): void {
    if (this.token!= undefined) {
      const decodedToken = this.helper.decodeToken (this.token);
      this.roles =decodedToken.roles;
      this.loggedUser = decodedToken.sub;
      localStorage.setItem('user', this.loggedUser);
      console.log(this.loggedUser);
    }
  }

  logout(): void {
    this.isloggedIn= false;
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.router.navigate ( ['header/login']);
  }

  setLoggedUserFromLocalStorage (login: string): void {
    this.loggedUser = login;
    this.isloggedIn = true;
  }

  loadToken(): void {
    this.token = localStorage.getItem('jwt')!;
    this.decodedJWT();
  }

  isTokenExpired(): boolean {
    return this.helper.isTokenExpired(this.token);
  }

  register(signupRequest:any): Observable<any> {
  return this.httpClient.post(BASIC_URL+"save", signupRequest);
  }

}
