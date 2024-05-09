// src/app/session.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
  apiUrl = environment.apiUrl;
  private baseUrl = this.apiUrl+'/add_session'

  getSessionByUserId(userId: string): Observable<any> {
    return this.http.get<any>(this.apiUrl+`/users/${userId}/sessions`);
  }

  addSession(session: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, session);
  }

  updateSessionTitle(sessionId: string, userId: string, title: string) {
    console.log('updating session title', title);
    return this.http.post(this.apiUrl+`/users/${userId}/sessions/${sessionId}/updateTitle`, { title });
  }
  
}
