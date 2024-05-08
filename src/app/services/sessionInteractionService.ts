// src/app/services/session-interaction.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

////////////////////////////////////////////
/**
 * @class
 * @description Messager between components. When certain events occured in one component, others will be informed to take actions by this class.
 */
//////////////////////////////////////////
@Injectable({
  providedIn: 'root'
})
export class SessionInteractionService {
  private sessionIdSource = new BehaviorSubject<string | null>(null);
  currentSessionId = this.sessionIdSource.asObservable();

  private firstSessionIdSource = new BehaviorSubject<string | null>(null);
  firstSessionId = this.firstSessionIdSource.asObservable();

  constructor() {}

  changeSession(sessionId: string) {
    this.sessionIdSource.next(sessionId);
  }

  changeFirstSession(sessionId: string) {
    this.firstSessionIdSource.next(sessionId);
  }
}
