import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class conversationService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.apiUrl;

  fetchResponse(messages: string[]): Observable<any> {
    return this.http.post(this.apiUrl+'/intent', messages);
  }
}
