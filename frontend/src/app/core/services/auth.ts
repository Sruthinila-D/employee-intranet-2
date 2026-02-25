import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageKey = 'current-user';

  currentUser = signal<User | null>(this.getUserFromStorage());

  isAuthenticated = computed(() => this.currentUser() !== null);

  login(role: 'Employee' | 'Manager' | 'HR' | 'Admin') {
    const user: User = {
      name: 'John Doe',
      role,
      location: 'Riyadh',
    };

    this.currentUser.set(user);
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem(this.storageKey);
  }

  private getUserFromStorage(): User | null {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : null;
  }
}
