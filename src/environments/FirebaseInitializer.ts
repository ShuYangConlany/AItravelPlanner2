import { Injectable, InjectionToken } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const FIREBASE_CONFIG = new InjectionToken('FirebaseConfig');

const firebaseConfig = {
  apiKey: "AIzaSyAQ7MdvIKpMHu5PNIl4IhA027N7CeP8Quw",
  authDomain: "aitravelplanner-b55ea.firebaseapp.com",
  projectId: "aitravelplanner-b55ea",
  storageBucket: "aitravelplanner-b55ea.appspot.com",
  messagingSenderId: "628042643935",
  appId: "1:628042643935:web:ce396b5820ebdcf983ec6a",
  measurementId: "G-DLDLEV0YDH"
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseInitializer {
  firebaseApp = initializeApp(firebaseConfig);
  firebaseAnalytics = getAnalytics(this.firebaseApp);
}

export const firebaseProvider = {
  provide: FIREBASE_CONFIG,
  useClass: FirebaseInitializer
};
