import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';
import { AppNotification } from '../../core/models';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  readonly notificationService = inject(NotificationService);

  filterMode = signal<'All' | 'Unread'>('All');

  readonly filteredNotifications = computed(() => {
    const list = this.notificationService.notifications();
    if (this.filterMode() === 'Unread') {
      return list.filter((n) => !n.read);
    }
    return list;
  });

  setFilter(mode: 'All' | 'Unread'): void {
    this.filterMode.set(mode);
  }

  markRead(n: AppNotification): void {
    this.notificationService.markAsRead(n.id);
  }

  markAllRead(): void {
    this.notificationService.markAllAsRead();
  }

  clearAll(): void {
    this.notificationService.clearAll();
  }
}
