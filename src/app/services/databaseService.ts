import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Speaker } from './speaker';

////////////////////////////////////////////
/**
 * @class
 * @description A medium for information exchange with MySQL database. Save a message to a session or get all messages from an existing session.
*/
//////////////////////////////////////////
@Injectable({
  providedIn: 'root'
})
export class databaseService {
  private apiSaveMessage = 'http://localhost:8080/messagesPersistence';
  private apiBaseUrl = 'http://localhost:8080/messagesPersistence';
  constructor(private http: HttpClient) {}

  /**
   * @method
   * @description Save a new message to database. 
   */
  saveMessage(id: String, message: string, timestamp: string,speaker: 'user' | 'agent', ): Observable<any> {
    return this.http.post(this.apiSaveMessage, { speaker, message, timestamp, id }, { responseType: 'json' });
  }

  /**
   * @method
   * @description Load all messages from an existing Session using its id.Show all messages on web page.
   */
  getSessionMessages(sessionId: string): Observable<{ sender: 'user' | 'agent', message: string }[]> {
    const url = `${this.apiBaseUrl}/getSessionMessages?sessionId=${sessionId}`;
    return this.http.get<Array<{ speaker: Speaker, content: string }>>(url).pipe(
        map(messages => {
          return messages.map(({ speaker, content }) => {
              return {
                  sender: (speaker === 'user' ? 'user' : (speaker === 'agent' ? 'agent' : null)) as 'user' | 'agent',
                  message: content
              };
          });
      }),
      catchError(error => {
          console.error('Failed to load messages:', error);
          return throwError(() => new Error('Failed to load messages'));
      })
    );
  }
}
