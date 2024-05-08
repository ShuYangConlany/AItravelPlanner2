import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
// import { authService } from '../../services/authService'; // 确保路径正确'
import { authService } from '../../services/authService';
import { getApp, initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../environments/firebaseConfig';
import { authFactory } from './authFactory';
import { FormsModule } from '@angular/forms';
import ParticlesConfig from './particles.json';
import { tsParticles } from "@tsparticles/engine";
import { IParticlesProps, NgxParticlesModule } from '@tsparticles/angular';
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';



@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [FormsModule,NgxParticlesModule],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css',
  providers: [
    {
      provide: 'loginService',
      useFactory: authFactory
    }
  ],
  
})
export class LoginComponent implements OnInit, AfterViewInit  {
  particlesConfig = ParticlesConfig;
  email = '';
  password = '';
  constructor(
    private authService: authService,
    @Inject('loginService') private loginService: any, 
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,) {
    const app = getApp(); 
  }
  ngAfterViewInit() {
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    if (!this.email || !this.password) {
      alert('Please provide email and password.');
      return;
    }
    this.loginService.login(this.email, this.password)
      .then(() => alert('Login successful'))
      .catch((error: { message: string; }) => alert('Login failed: ' + error.message));
  }

  onRegister(): void {
    if (!this.email || !this.password) {
      alert('Please provide email and password.');
      return;
    }
    this.loginService.register(this.email, this.password)
      .then(() => alert('register successful'))
      .catch((error: { message: string; }) => alert('Login failed: ' + error.message));
  }
}