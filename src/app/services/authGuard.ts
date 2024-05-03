// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { authService } from "./authService"
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: authService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        // if (!isLoggedIn) {
        //   this.router.navigate(['/login']); // Redirect to login page if not logged in
        //   return false;
        // }
        return true;
      })
    );
  }
}
