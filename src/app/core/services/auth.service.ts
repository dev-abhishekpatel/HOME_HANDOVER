import { Injectable, computed, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models';
import { ToastService } from './toast.service';

const DEMO_USERS: User[] = [
  {
    id: 'usr_1',
    name: 'Meera Sharma',
    email: 'meera@homehandover.com',
    role: 'Household Admin',
    avatar: 'M',
    availability: 'Available',
    phone: '+91 98765 43210',
    householdName: 'Sharma Residence',
  },
  {
    id: 'usr_2',
    name: 'Aarav Sharma',
    email: 'aarav@homehandover.com',
    role: 'Task Creator',
    avatar: 'A',
    availability: 'In office',
    phone: '+91 98765 43211',
    householdName: 'Sharma Residence',
  },
  {
    id: 'usr_3',
    name: 'Riya Sharma',
    email: 'riya@homehandover.com',
    role: 'Family Member',
    avatar: 'R',
    availability: 'At home',
    phone: '+91 98765 43212',
    householdName: 'Sharma Residence',
  },
  {
    id: 'usr_4',
    name: 'Kabir Sharma',
    email: 'kabir@homehandover.com',
    role: 'Family Member',
    avatar: 'K',
    availability: 'Busy',
    phone: '+91 98765 43213',
    householdName: 'Sharma Residence',
  },
];

const STORAGE_KEY_USER = 'home_handover_current_user';
const STORAGE_KEY_ALL_USERS = 'home_handover_all_users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private toast = inject(ToastService);

  readonly currentUser = signal<User | null>(this.loadUserFromStorage());
  readonly allUsers = signal<User[]>(this.loadAllUsersFromStorage());

  readonly isLoggedIn = computed(() => this.currentUser() !== null);

  constructor() {
    // If no user set initially, default to Meera for demo
    if (!this.currentUser()) {
      this.setUser(DEMO_USERS[0]);
    }
  }

  private loadUserFromStorage(): User | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER);
      return stored ? JSON.parse(stored) : DEMO_USERS[0];
    } catch {
      return DEMO_USERS[0];
    }
  }

  private loadAllUsersFromStorage(): User[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ALL_USERS);
      return stored ? JSON.parse(stored) : DEMO_USERS;
    } catch {
      return DEMO_USERS;
    }
  }

  private setUser(user: User | null): void {
    this.currentUser.set(user);
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }

  login(email: string, password?: string): boolean {
    const users = this.allUsers();
    const cleanEmail = email.trim().toLowerCase();
    const found = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (found) {
      this.setUser(found);
      this.toast.show(`Welcome back, ${found.name}!`, 'success');
      return true;
    } else {
      // If user doesn't exist, create temporary demo user
      const nameFromEmail = cleanEmail.split('@')[0];
      const capitalized = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
      const newUser: User = {
        id: 'usr_' + Date.now(),
        name: capitalized,
        email: cleanEmail,
        role: 'Family Member',
        avatar: capitalized.charAt(0),
        availability: 'Available',
        householdName: 'Sharma Residence',
      };
      const updated = [...users, newUser];
      this.allUsers.set(updated);
      localStorage.setItem(STORAGE_KEY_ALL_USERS, JSON.stringify(updated));
      this.setUser(newUser);
      this.toast.show(`Welcome back, ${newUser.name}!`, 'success');
      return true;
    }
  }

  signup(name: string, email: string, role: User['role'], householdName: string): boolean {
    const users = this.allUsers();
    const cleanEmail = email.trim().toLowerCase();

    const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      this.toast.show('An account with this email already exists. Logging you in...', 'info');
      this.setUser(existing);
      return true;
    }

    const newUser: User = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      email: cleanEmail,
      role: role || 'Family Member',
      avatar: name.trim().charAt(0).toUpperCase(),
      availability: 'Available',
      householdName: householdName.trim() || 'My Household',
    };

    const updated = [...users, newUser];
    this.allUsers.set(updated);
    localStorage.setItem(STORAGE_KEY_ALL_USERS, JSON.stringify(updated));
    this.setUser(newUser);
    this.toast.show(`Account created! Welcome to Home Handover, ${newUser.name}.`, 'success');
    return true;
  }

  quickDemoLogin(userId: string): void {
    const found = this.allUsers().find((u) => u.id === userId);
    if (found) {
      this.setUser(found);
      this.toast.show(`Logged in as ${found.name} (${found.role})`, 'success');
      this.router.navigate(['/dashboard']);
    }
  }

  logout(): void {
    const name = this.currentUser()?.name;
    this.setUser(null);
    this.toast.show(name ? `Goodbye, ${name}. Signed out successfully.` : 'Signed out successfully.', 'info');
    this.router.navigate(['/login']);
  }

  updateProfile(partial: Partial<User>): void {
    const current = this.currentUser();
    if (!current) return;
    const updated = { ...current, ...partial };
    this.setUser(updated);

    // Update in allUsers array too
    const all = this.allUsers().map((u) => (u.id === updated.id ? updated : u));
    this.allUsers.set(all);
    localStorage.setItem(STORAGE_KEY_ALL_USERS, JSON.stringify(all));

    this.toast.show('Profile updated successfully!', 'success');
  }
}
