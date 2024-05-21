import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {questionModel} from "../models/question.model";
import {AuthService, BASIC_URL} from "./auth/auth.service";





@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  hamid:any ;

  jwt :string = "Bearer " +this.authService.getToken();
  httpHeaders = new HttpHeaders({"Authorization ":this.jwt});

  constructor(private http : HttpClient,private authService : AuthService) { }

  getQuestionJson(){


    console.log( this.http.get<any>("http://localhost:8080/api/questions",{headers:this.httpHeaders}));
    return this.http.get<any>("assets/questions.json");

  }



}
