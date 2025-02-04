import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authKey = 'isAuthenticated';
  private readonly userEmailKey = 'userEmail';

  constructor() {}

  login(email: string): void {
    localStorage.setItem(this.authKey, 'true');
    localStorage.setItem(this.userEmailKey, email.toLowerCase() );
  }

  logout(): void {
    localStorage.removeItem(this.authKey);
    localStorage.removeItem(this.userEmailKey);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.authKey) === 'true';
  }

  getCurrentUserEmail(): string | null {
    return localStorage.getItem(this.userEmailKey);
  }

}