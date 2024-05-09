import { Component, Inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SessionService } from '../services/sessionService';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { SessionInteractionService } from '../services/sessionInteractionService';
import { authFactory } from '../auth/login-component/authFactory';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    HttpClientModule,
    FormsModule  ,
  ],
  providers: [
    {
      provide: 'authService',
      useFactory: authFactory
    }
  ]
})
export class SideBarComponent {
  sessions: any[] = [];
  userId!: string
  activeSessionId: string | null = null;
  private clickTimeout: any = null;

  

  constructor(private sessionService: SessionService,private SessionInteractionService: SessionInteractionService,
    @Inject('authService') private authService: any
  ) { }

  ngOnInit() {
    this.fetchUserId();
    this.loadSessions(this.userId);  
  }

  loadSessions(userId: string) {
    this.sessionService.getSessionByUserId(userId).subscribe({
      next: (data) => {
        this.sessions = data;
        if (this.sessions.length > 0) {
          const firstSessionId = this.sessions[0].sessionId;
          this.activeSessionId = firstSessionId;
          this.SessionInteractionService.changeSession(firstSessionId);
        }
      },
      error: (error) => console.error('Error fetching sessions', error)
    });
  }

  onSessionClick(sessionId: string) {
    this.activeSessionId = sessionId;
    this.SessionInteractionService.changeSession(sessionId);
  }

  addSession() {
    const now = new Date();
    const session = {
      sessionId: `sid_${this.userId}_${now.getTime()}`,
      userId: this.userId,
      title: 'New Session',
      timestamp: now.toISOString()
    };
    this.sessionService.addSession(session).subscribe({
      next: (response) => {
        this.sessions.push(session); 
        this.loadSessions(this.userId)
      },
      error: (error) => console.error('Error adding session:', error)
    });
  }

  fetchUserId(): void {
    this.userId = this.authService.getCurrentUserId();
    if (this.userId) {
      console.log('Current User ID:', this.userId);
    } else {
      console.log('No user is currently logged in.');
    }
  }

  updateSessionTitle(sessionId: string, title: string) {
    this.sessionService.updateSessionTitle(sessionId, this.userId, title).subscribe({
      next: () => {
        console.log('Session title updated successfully');
      },
      error: (error) => {
        console.error('Error updating session title:', error);
      }
    });
  }

  enableEdit(session: any) {
    clearTimeout(this.clickTimeout);
    this.clickTimeout = null;
    session.editing = true;
  }

  disableEdit(session: any) {
    session.editing = false;
  }

}
