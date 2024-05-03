import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from "./dashboard/dashboard.component";
import { SideBarComponent } from './sidebar/side-bar.component';
import { Observable } from 'rxjs';
import { authService } from './services/authService'
import { LoginComponent } from './auth/login-component/login-component.component'
import { CommonModule } from '@angular/common';
import { firebaseConfig } from '../environments/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import {  inject } from '@angular/core';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterModule, SideBarComponent, DashboardComponent,LoginComponent,CommonModule
    ]
})
export class AppComponent {
  title = 'angular-AI-planner';
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: authService) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    // console.log("is logged in:",this.isLoggedIn$)
  }
}
