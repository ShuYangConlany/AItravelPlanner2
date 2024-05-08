import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NONE_TYPE } from '@angular/compiler';
import { FlightOfferReqService } from '../../services/FlightOfferReqService';
import { DurationPipe } from "../flight-offers/duration.pipe";

@Component({
    selector: 'app-gemini-query',
    templateUrl: './api-manager.component.html',
    styleUrls: ['./api-manager.component.css'],
    standalone: true,
    imports: [FormsModule, CommonModule, RouterModule, HttpClientModule, DurationPipe] // import FormsModule
})
export class ApiManagerComponent {
  userQuestion: string = '';
  answerWhichApi: string | null = null;
  GeminiNewResponse: string | null = null;
  answerFlightOffersPara: string | null = null;
  flightOffers: any;
  dialogues: Array<{ sender: 'user' | 'Gemini' | 'flightTicket', message: string | object }> = [];
  tickets: Array<{message: string }> = [];

  constructor(private http: HttpClient,private flightOfferReqService: FlightOfferReqService) {}

  adjustTextareaHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  
  submitQuestion() {
    const prompt = `I have a program that is designed to answer user questions about travel, involving API calls. 
    The question below may require calling an API to look up flight information. Should I make that API call, answering 'flight' or 'no': "${this.userQuestion}"`;
    this.dialogues.push({ sender: 'user', message: this.userQuestion });
    this.http.post<any>('http://localhost:8080/generate-content', { prompt }).subscribe(response => {
      this.answerWhichApi = response.candidates[0].content.parts.map((part: { text: any; }) => part.text).join(' ');
      // if (this.answerWhichApi){
      //   this.dialogues.push({ sender: 'Gemini', message: this.answerWhichApi });
      // }
      this.ansAnalyse(this.answerWhichApi)
    });
  }

  async ansAnalyse(ans: any ) {
    if (ans=='flight'){
      await this.parseFlightOffersPara()
      const phraseToCheck = "Please provide additional information";
      const containsPhrase = this.answerFlightOffersPara ? this.answerFlightOffersPara.includes(phraseToCheck) : false;
      console.log(containsPhrase); // This will log 'true' if the phrase is found, otherwise 'false'.
      if(containsPhrase==false){
        console.log("answerFlightOffersPara",this.answerFlightOffersPara);
        if (this.answerFlightOffersPara !== null) {
          let formData = {
            originLocationCode: '',
            destinationLocationCode: '',
            departureDate: '',
            returnDate: '',
            adults: 1,
            max: 1
          };
          formData = await this.flightOfferReqService.parseApiData(this.answerFlightOffersPara);
          console.log('the formData:',formData);
          this.submitFormFlightOffers(formData)
        } else {
          console.log('answerSatisfyPara is null');
        }
      }
    } else {
      const prompt = `"${this.userQuestion}"`;
      this.http.post<any>('http://localhost:8080/generate-content', { prompt }).subscribe(response => {
        this.GeminiNewResponse = response.candidates[0].content.parts.map((part: { text: any; }) => part.text).join(' ');
        if (this.GeminiNewResponse){
          this.dialogues.push({ sender: 'Gemini', message: this.GeminiNewResponse });
        }
      });
    }
  }

  parseFlightOffersPara(): Promise<void>{
    const prompt = `Analyze the user's question below. If it contains all the following details: 
    departure location, destination, departure time, return time, and the number of people, return the information in the format:
    Departure Location:XX,Destination:XX,Departure Time:XX,Return Time:XX,Number of People:1. 
    (time in format:YYYY-MM-DD,the answer should be in the format,with"-" to seperate the digits,pay attention). Otherwise, please return in the format 'Please provide additional information' + all missing information in 
    User's question "${this.userQuestion}"`;
    return new Promise((resolve, reject) => {
      this.http.post<any>('http://localhost:8080/generate-content', { prompt })
        .subscribe({
          next: (response) => {
            this.answerFlightOffersPara = response.candidates[0].content.parts.map((part: { text: any; }) => part.text).join(' ');
            resolve();
          },
          error: (error) => {
            console.error('Error processing the response:', error);
            this.answerFlightOffersPara = 'An error occurred. Please try again.';
            reject(error);
          }
        });
    });
  }

  submitFormFlightOffers(formData:any) {
    const url = 'http://localhost:8080/flight-offers';
    this.http.get(url, { params: formData }).subscribe({
      next: (data) => {
        this.flightOffers = data;
        console.log(this.flightOffers)
        if (data){
          // this.tickets.push
          this.dialogues.push({ sender: 'flightTicket', message: data });
        }
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      }
    });
  }
}



//From San Francisco to Boston may,02,2024 till may,04,2024,1 person
//Can you tell me the flight from New York to Boston ? It's just me and I am planning to leave at 05/01/2024 and returns 05/06/2024
//Departure Location: London Destination: Boston Departure Time: 2024-05-02 Return Time: 2024-05-04 Number of People: 1
// Can you tell me the flight. The departure location is New York. And destination location is Boston. It's just me and I am planning to leave at 05/10/2024 and returns 05/14/2024