import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoodService {
  private baseUrl = 'http://localhost:8080/api/usermoods';

  constructor(private http: HttpClient) { }

  saveUserMood(username: string, mood: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}?username=${username}&mood=${mood}`, {});
  }

  getUserMoods(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${username}`);
  }
}
