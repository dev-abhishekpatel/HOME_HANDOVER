import { Injectable, computed, signal } from '@angular/core';
import { AppNotification } from '../models';

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    message: 'Aarav acknowledged the parcel pickup task.',
    time: '5 min ago',
    tone: 'success',
    read: false,
    timestamp: Date.now() - 300000,
  },
  {
    id: 'n2',
    message: 'Riya added a new note for the plant care task.',
    time: '22 min ago',
    tone: 'info',
    read: false,
    timestamp: Date.now() - 1320000,
  },
  {
    id: 'n3',
    message: 'Electrician visit is pending confirmation.',
    time: '1 hour ago',
    tone: 'warning',
    read: true,
    timestamp: Date.now() - 3600000,
  },
  {
    id: 'n4',
    message: 'Meera updated the gate security schedule for the weekend.',
    time: '2 hours ago',
    tone: 'info',
    read: true,
    timestamp: Date.now() - 7200000,
  },
];

const STORAGE_KEY_NOTIFS = 'home_handover_notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  readonly notifications = signal<AppNotification[]>(this.loadFromStorage());

  readonly unreadCount = computed(() => this.notifications().filter((n) => !n.read).length);

  private loadFromStorage(): AppNotification[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_NOTIFS);
      return stored ? JSON.parse(stored) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  }

  private saveToStorage(list: AppNotification[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
  }

  addNotification(message: string, tone: AppNotification['tone'] = 'info'): void {
    const newNotif: AppNotification = {
      id: 'n_' + Date.now(),
      message,
      time: 'Just now',
      tone,
      read: false,
      timestamp: Date.now(),
    };
    const updated = [newNotif, ...this.notifications()];
    this.notifications.set(updated);
    this.saveToStorage(updated);
  }

  markAsRead(id: string): void {
    const updated = this.notifications().map((n) => (n.id === id ? { ...n, read: true } : n));
    this.notifications.set(updated);
    this.saveToStorage(updated);
  }

  markAllAsRead(): void {
    const updated = this.notifications().map((n) => ({ ...n, read: true }));
    this.notifications.set(updated);
    this.saveToStorage(updated);
  }

  clearAll(): void {
    this.notifications.set([]);
    this.saveToStorage([]);
  }
}
