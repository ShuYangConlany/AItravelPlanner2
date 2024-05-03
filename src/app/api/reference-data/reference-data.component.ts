import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reference-data',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule],
  templateUrl: './reference-data.component.html',
  styleUrl: './reference-data.component.css'
})
export class ReferenceDataComponent {
  IATAcode: string = '';
  cityName: string = '';
  errorMessage: string = '';
  constructor(private http: HttpClient) {}

  onSubmit(): void {
    const url = 'http://localhost:8080/reference_data';
    const params = new HttpParams().set('cityName', this.cityName);
    this.http.get(url, { params: params }).subscribe({
      next: (response: any) => {
        if (response.data && response.data.length > 0){
          this.IATAcode = response.data[0].iataCode;
        }else {
          this.errorMessage = 'No data found or invalid response structure';
          console.error(this.errorMessage);
        }
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
}
