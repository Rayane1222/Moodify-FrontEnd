import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {MatCardContent, MatCardTitle} from "@angular/material/card";
import {AuthService} from "../service/auth/auth.service";
import {UserModel} from "../models/user.model";
import {AdminComponent} from "../admin/admin.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    MatCardTitle,
    MatCardContent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  user = new UserModel();
  error: number=0;



  constructor(private router: Router,private http:HttpClient,private authService: AuthService) {

  }

  onLoggedin(): void {
    this.authService.login(this.user).subscribe ( {
      next: (data) => {
        let jwtToken: string = data.headers.get("Authorization")!;
        this.authService.saveToken (jwtToken);
        this.router.navigate ( ['/welcome']);

      },
      error: (error: any): void => {
        this.error = 1;
      }
    })
  }




  protected readonly UserModel = UserModel;
}
