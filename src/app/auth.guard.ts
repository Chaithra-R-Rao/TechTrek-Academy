import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    const userEmail = this.authService.getCurrentUserEmail();
    if (userEmail) {
      return this.dataService.getUserByEmail(userEmail).pipe(

        map(user => {
          const user1 = user[0];
          if (user1) {

            const expectedRole: string = route.data['expectedRole'];
           
            if (user1.role == expectedRole) {
             
              return true;
            } else {
              this.router.navigate(['/unauthorized']);
              return false;
            }
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        })
      );
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}