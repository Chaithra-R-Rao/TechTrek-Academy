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

