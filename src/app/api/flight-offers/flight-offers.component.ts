import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DurationPipe } from './duration.pipe';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'flight_offers',
  templateUrl: './flight-offers.component.html',
  styleUrls: ['./flight-offers.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule,HttpClientModule,DurationPipe ] // import FormsModule
})
export class FlightOffersComponent implements OnInit {
  constructor(private http: HttpClient) { }
  formData = {
    originLocationCode: '',
    destinationLocationCode: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    max: 3
  };
  flightOffers: any;
  apiUrl = environment.apiUrl;
  

  ngOnInit(): void {
  }
  
  verifyFlightOffer(offer: any) {
    console.log('offer successful', offer);
    const verifyUrl = this.apiUrl+'pricing';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-HTTP-Method-Override':'GET'
    });
    if (offer) {
      console.log("my offer:",offer)
      console.log("my headers:",headers)
      const requestBody = offer;
      
      this.http.post(verifyUrl, requestBody, { headers }).subscribe({
        next: (response) => {
          console.log('Verification successful', response);
        },
        error: (error) => {
          console.error('Verification failed', error);
        }
      });
    } else {
      console.error('No flight offer data available for verification');
    }
  }
  submitForm() {
    const url = this.apiUrl+'flight-offers';
    this.http.get(url, { params: this.formData }).subscribe({
      next: (data) => {
        this.flightOffers = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
}