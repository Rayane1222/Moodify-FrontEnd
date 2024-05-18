import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  CustomerArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  username: string ="";
  email: string ="";
  password: string ="";


  constructor(private http: HttpClient) {

  }

  save()
  {

    let bodyData = {
      "username" :this.username,
      "email" :this.email,
      "password" :this.password
    };
    this.http.post("http://localhost:8080/api/user/save",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
      {
        console.log(resultData);
        alert("User Registered Successfully");
      });
  }

}
