import { Routes } from '@angular/router';
import { FlightOffersComponent } from './api/flight-offers/flight-offers.component';
import { AppComponent } from './app.component';
import { ApiManagerComponent } from './api/api-manager/api-manager.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReferenceDataComponent } from './api/reference-data/reference-data.component';
import { GoogleMapComponent } from './api/google-map/google-map.component';
import { ConversationComponent } from './conversation/conversation.component';


export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'flight_offers', component: FlightOffersComponent },
    { path: 'api-manager', component: ApiManagerComponent } ,
    { path: 'reference-data', component: ReferenceDataComponent } ,
    { path: 'google-map', component: GoogleMapComponent } ,
    { path: 'conversation', component: ConversationComponent } ,
];
