import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { authFactory } from '../auth/login-component/authFactory';

////////////////////////////////////////////
/**
 * @class
 * @description Show detailed information of the user
 * @todo add user's Status. Add request numbers, add daily recommendations
 */
//////////////////////////////////////////
@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [
    {
      provide: 'authService',
      useFactory: authFactory
    }
  ]
})
export class DashboardComponent {
  title = 'angular-AI-planner';
  constructor(@Inject('authService') private authService: any) {}
  onSignOut(): void {
    this.authService.signOut()
      .then(() => alert('You have been signed out'))
      .catch((error: { message: string; }) => alert('Sign out failed: ' + error.message));
  }
}
