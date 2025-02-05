import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authKey = 'isAuthenticated';
  private readonly userEmailKey = 'userEmail';
  private readonly userRoleKey = 'userRole';

  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();

  constructor() {
    const storedRole = localStorage.getItem(this.userRoleKey);
    if (storedRole) {
      this.userRoleSubject.next(storedRole);
    }
  }

  setUserRole(role: string | null) {
    this.userRoleSubject.next(role);
    if (role) {
      localStorage.setItem(this.userRoleKey, role);
    } else {
      localStorage.removeItem(this.userRoleKey);
    }
  }

  login(email: string, role: string): void {
    localStorage.setItem(this.authKey, 'true');
    localStorage.setItem(this.userEmailKey, email.toLowerCase());
    this.setUserRole(role);
  }

  logout(): void {
    localStorage.removeItem(this.authKey);
    localStorage.removeItem(this.userEmailKey);
    this.setUserRole(null);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.authKey) === 'true';
  }

  getCurrentUserEmail(): string | null {
    return localStorage.getItem(this.userEmailKey);
  }
}


// import { Injectable } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { loginSuccess, logout } from './store/actions/auth.actions';
// import { AuthState } from './store/reducers/auth.reducer';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private readonly authKey = 'isAuthenticated';
//   private readonly userEmailKey = 'userEmail';

//   constructor() {}

//   private userRoleSubject = new BehaviorSubject<string | null>(null);
//   userRole$ = this.userRoleSubject.asObservable();

//   setUserRole(role: string | null) {
//     this.userRoleSubject.next(role);
//   }

//   login(email: string, role: string): void {
//     localStorage.setItem(this.authKey, 'true');
//     localStorage.setItem(this.userEmailKey, email.toLowerCase());
//     localStorage.setItem('userRole', role);
    
//   }
  

//   logout(): void {
//     localStorage.removeItem(this.authKey);
//     localStorage.removeItem(this.userEmailKey);
//     localStorage.removeItem('userRole');
//   }

// isAuthenticated(): boolean {
//   return localStorage.getItem(this.authKey) === 'true';
// }

// getCurrentUserEmail(): string | null {
//   return localStorage.getItem(this.userEmailKey);
// }

// }





// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
//   isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

//   constructor(private store: Store<{ auth: AuthState }>) {
//     const token = localStorage.getItem('token');
//     this.isAuthenticatedSubject.next(!!token);
//   }

//   isAuthenticated(): boolean {
//     return this.isAuthenticatedSubject.value;
//   }

//   login(token: string, email: string, role: string): void {
//     this.store.dispatch(loginSuccess({ token, email, role })); // ✅ Include role in login
//     this.isAuthenticatedSubject.next(true);
//   }

//   logout(): void {
//     this.store.dispatch(logout());
//     this.isAuthenticatedSubject.next(false);
//   }

//   getCurrentUserEmail(): Observable<string | null> {
//     return this.store.select((state) => state.auth.email);
//   }

//   getCurrentUserRole(): Observable<string | null> {
//     return this.store.select((state) => state.auth.role); // ✅ Get role from NgRx state
//   }
// }