import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class dialogflowService {
  constructor(private http: HttpClient) { }

  fetchInitResponse(): Observable<any> {
    return this.http.post('https://us-central1-flomadaiplanner.cloudfunctions.net/initConversation', {});
  }

  fetchResponse(userMessage: string): Observable<any> {
    const requestBody = { message: userMessage };
    console.log(requestBody)
    return this.http.post('https://us-central1-flomadaiplanner.cloudfunctions.net/DialogflowController', requestBody);
    // return this.http.post('https://4ff1-2601-19b-280-fa70-8d90-3a04-f4f7-4adb.ngrok-free.app/dialogflow/detect_intent', requestBody);
  }
}
