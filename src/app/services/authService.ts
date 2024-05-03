// auth.service.ts
import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FirebaseApp, getApp, initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../environments/firebaseConfig';


initializeApp(firebaseConfig)
@Injectable({
    providedIn: 'root'
  })
export class authService {
  private authState = new BehaviorSubject<boolean>(false);
  private auth!: Auth;

  constructor() {
    try {
      const app = getApp(); 
      this.auth = getAuth(app); 
      onAuthStateChanged(this.auth, (user) => {
        this.authState.next(!!user);
      });
    } catch (error) {
      console.error('Firebase App not initialized:', error);
      
    }
  }
  
  isLoggedIn(): Observable<boolean> {
    return this.authState.asObservable();
  }

  login(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        // console.log('User logged in:', result.user);
      })
      .catch((error) => {
        console.error('Login error:', error);
        throw error;
      });
  }

  register(email: string, password: string): Promise<void> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        // console.log('User registered:', result.user);
      })
      .catch((error) => {
        console.error('Registration error:', error);
        throw error;
      });
  }

}