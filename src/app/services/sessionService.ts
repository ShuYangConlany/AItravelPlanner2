// src/app/session.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

////////////////////////////////////////////
/**
 * @class
 * @description same as databaseService
 * @todo Merge this class with datavaseService
 */
//////////////////////////////////////////
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8080/add_session'

  getSessionByUserId(userId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/users/${userId}/sessions`);
  }

  addSession(session: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, session);
  }
}
