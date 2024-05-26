import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    MatCardContent,
    MatCardTitle,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatIcon,
    MatIconButton,
    NgIf,
    MatButton,
    MatCard,
    MatLabel,
    MatError,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  Name: string = "";
  email: string = "";
  password: string = "";
  isregistred : boolean = true;


  constructor(
    private authService: AuthService,
    private router: Router) {
  }


  onSubmit(): void {

    let bodyData = {
      "Name": this.Name,
      "email": this.email,
      "password": this.password
    };

    this.authService.register(bodyData).subscribe(
      (response) => {
        alert("User Registered Successfully");
        this.router.navigateByUrl('header/login')
        this.isregistred = true;
      },
      (error) => {
        alert("Sign up failed .Please Try again.");
        this.isregistred = false;

      }
    )
  }



}
