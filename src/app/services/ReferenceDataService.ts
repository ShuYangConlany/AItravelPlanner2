import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

////////////////////////////////////////////
/**
 * @class
 * @description flight offer api only accepts IATA code instead of the city's name. reference_data api is a translation.
*/
//////////////////////////////////////////
@Injectable({
  providedIn: 'root',
})
export class ReferenceDataService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;
  private url = this.apiUrl+'reference_data'; 
  
  getReferenceData(cityName: string): Observable<any> {
    const params = new HttpParams().set('cityName', cityName);
    return this.http.get(this.url, { params: params }).pipe(
      map((response: any) => {
        if (response.data && response.data.length > 0) {
          return response.data[0].iataCode; 
        } else {
          throw new Error('No data found or invalid response structure');
        }
      }),
      catchError((error) => {
        console.error('There was an error!', error);
        return of(null); 
      })
    );
  }
}