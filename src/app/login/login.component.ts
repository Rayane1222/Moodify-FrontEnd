import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  /*
   error : number = 0;
   user :UserModel = new UserModel();

   constructor(private authService : AuthService, private router : Router) {
   }

   onLoggedin(){
     console.log(this.user);
     let isValidUser : boolean = this.authService.SignIn(this.user);
     if(isValidUser)
     {
       this.router.navigate(['/welcome'])
     }else
       alert('User authentification failed')
       this.error = 1;

   }
 */


   email: string ="";
   password: string ="";

  constructor(private router: Router,private http:HttpClient) {

  }



  Login(){
   console.log(this.email);
   console.log(this.password);

   let bodyData = {
     email: this.email,
     password: this.password,
   };
     this.http.post("http://localhost:8080/api/user/signin",bodyData).subscribe( (resultData: any)=> {
       console.log(resultData);

       if (resultData.message == "Email not exists")
       {
         alert("Email not exits");
       }else if(resultData.message == "Login Success")
       {
         this.router.navigateByUrl("/welcome")
       }
       else
       {
         alert("Incorrect Email and Password not match");
       }
       }
     )
  }
}
