import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { firebaseConfig } from './environments/firebaseConfig'
import { initializeApp } from 'firebase/app';
import { getApp } from 'firebase/app'; // 引入getApp

import { enableProdMode, importProvidersFrom } from '@angular/core';
// import { environment } from './environments/environment';
import { getAnalytics } from 'firebase/analytics';
import { provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app/app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

bootstrapApplication(AppComponent, 
    {
    providers: [
        provideRouter(routes), provideClientHydration(),provideHttpClient(withFetch()),
      importProvidersFrom(
        provideFirebaseApp(() => initializeApp(firebaseConfig))
      ),
      importProvidersFrom(
        provideFirestore(() => getFirestore())
      )
    ]
  }
).catch((err) => console.error(err));