import { Component, Inject } from '@angular/core';
import { dialogflowService } from '../services/dialogflowService';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {databaseService} from '../services/databaseService';
import { OnInit } from '@angular/core';
import { DurationPipe } from '../api/flight-offers/duration.pipe';
import { SessionInteractionService } from '../services/sessionInteractionService';
import { authFactory } from '../auth/login-component/authFactory';

////////////////////////////////////////////
/**
 * @class
 * @description This class is the main component to have a conversation with the chat bot.
 *
 * @param {Array} responseMessage - The response from Gemini/Dialogflow CX. HTML file will retrieve its messages content and display it.
 * @param {any} userMessage - User's input, representing their request and ans. Given value part see html file.
 * @param {Array} dialogues - When loading historical sessions from database, all data will be stored in this param. Html file will retrieve its messages content and display it.
 */
//////////////////////////////////////////
@Component({
  standalone: true,
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
  imports: [CommonModule,DurationPipe,FormsModule,],
  providers: [
    {
      provide: 'authService',
      useFactory: authFactory
    }
  ]
})
export class ConversationComponent implements OnInit {
  responseMessage: string = '';
  userMessage: any;
  dialogues: Array<{ sender: 'user' | 'agent', message: string | object }> = [];
  userId!: string;
  sessionId!: string;


  /**
   * @constructor
   * @param {dialogflowService} dialogflowService - A medium for information exchange with Dialogflow. Sending messages and receiving messages.
   * @param {databaseService} databaseService - A medium for information exchange with MySQL database. Save a message to a session or get all messages from an existing session.
   * @param {SessionInteractionService} sessionInteraction - When sidebar component take certain actions, this param will operate functions from this class. Implement components linkage.
   */
  constructor(private dialogflowService: dialogflowService, 
    private databaseService: databaseService,
    private sessionInteraction: SessionInteractionService,
    @Inject('authService') private authService: any) { }

  /**
   * @init
   * @description load a session, wake up the dialogflow CX agent.
   * @TODO For now, the default session loaded being session 1002. Needs to be the last one session last time.
   */
  ngOnInit() {
    this.initDialogflowAgent();
    // this.loadSessionMessages('1002')
    this.sessionInteraction.currentSessionId.subscribe(sessionId => {
      if (sessionId) {
        this.loadSessionMessages(sessionId);
      }
    });
    this.sessionInteraction.currentSessionId.subscribe(sessionId => {
      if (sessionId) {
        this.sessionId=sessionId;
      }
    });
    this.fetchUserId()
  }

  /**
   * @method
   * @description Load all messages in a given session and show them on the screen
   */
  loadSessionMessages(sessionId: string) {
    this.databaseService.getSessionMessages(sessionId).subscribe({
      next: (dialogues) => {
        this.dialogues = dialogues.map(dialogue => ({
          sender: dialogue.sender,
          message: dialogue.message
        }));
      },
      error: (error) => console.error('Error loading dialogues:', error)
    });
  }

  /**
   * @method
   * @description Invoke a webhook function to communicate with 
   */
  initDialogflowAgent() {
    this.dialogflowService.fetchInitResponse().subscribe({
      next: (response: any) => {
        // this.messages.push(`Bot: ${response.message}`);
        this.responseMessage = response.message;
      },
      error: (error) => console.error('Error initializing the conversation:', error)
    });
  }

  /**
   * @method
   * @description Click event handler function. send a request to agent then get its response, store messages.
   * @todo After having authentication, change the id to the current user's id.
   * @todo Add a Anonymous mode, don't need to log in but do not have data persistence
   */
  sendMessage() {    
    if (!this.userMessage.trim()) return; // message cannot be empty
    const currentTimestamp = new Date().toISOString();
    console.log("here:",this.sessionId)
    this.databaseService.saveMessage(this.sessionId, this.userMessage,currentTimestamp,'user').subscribe({
      next: (response) => console.log('User message saved', response),
      error: (error) => console.error('Error saving user message:', error)
    });

    this.dialogues.push({ sender: 'user', message: this.userMessage });

    this.dialogflowService.fetchResponse(this.userMessage).subscribe({
      next: (response: any) => {
        this.responseMessage = response.message;
        const currentTimestampAgent = new Date().toISOString();
        this.dialogues.push({ sender: 'agent', message: response.message });

        this.databaseService.saveMessage(this.sessionId, response.message,currentTimestamp,'agent').subscribe({
          next: (response) => console.log('agent message saved', response),
          error: (error) => console.error('Error saving agent message:', error)
        });
      },
      error: (error) => console.error('Error sending the message:', error)
    });

    this.userMessage = '';
  }

  adjustTextareaHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  fetchUserId(): void {
    this.userId = this.authService.getCurrentUserId();
    if (this.userId) {
      console.log('Current User ID:', this.userId);
    } else {
      console.log('No user is currently logged in.');
    }
  }
}