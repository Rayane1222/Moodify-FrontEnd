import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {questionModel} from "../models/question.model";
import {AuthService, BASIC_URL} from "./auth/auth.service";
import {Observable} from "rxjs";



export interface PeriodicElement {
  id: any;
  question: any;
}



@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  jwt: string = "Bearer " + this.authService.getToken();
  httpHeaders = new HttpHeaders({ "Authorization": this.jwt });
  private apiUrl = 'http://localhost:8080/api/questions';

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  getQuestionJson() {
    return this.http.get<any>("assets/questions.json");
  }

  getbackQuestion(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/api/questions");
  }

  createQuestion(question: PeriodicElement): Observable<PeriodicElement> {
    const jwt: string = "Bearer " + this.authService.getToken();
    const httpHeaders = new HttpHeaders({ "Authorization": jwt, "Content-Type": "application/json" });
    return this.http.post<PeriodicElement>("http://localhost:8080/api/add", question, { headers: httpHeaders });
  }

  deleteQuestion(questionId: number): Observable<any> {
    const jwtToken = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      })
    };
    return this.http.delete(`http://localhost:8080/api/questions/${questionId}`, httpOptions);
  }
  getQuestionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateQuestion(id: number, question: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, question);
  }


}
