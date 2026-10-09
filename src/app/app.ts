import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { HandoverService } from './core/services/handover.service';
import { NotificationService } from './core/services/notification.service';
import { ToastService } from './core/services/toast.service';
import { CreateHandoverModalComponent } from './shared/components/create-handover-modal/create-handover-modal.component';
import { InviteMemberModalComponent } from './shared/components/invite-member-modal/invite-member-modal.component';
import { ToastContainerComponent } from './shared/components/toast-container/toast-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    CreateHandoverModalComponent,
    InviteMemberModalComponent,
    ToastContainerComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly authService = inject(AuthService);
  readonly handoverService = inject(HandoverService);
  readonly notificationService = inject(NotificationService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  readonly appName = 'Home Handover';

  showCreateModal = false;
  showInviteModal = false;
  showNotifDropdown = false;
  showProfileMenu = false;
  isSyncing = false;

  readonly navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'bi-grid-1x2-fill' },
    { label: 'Households', path: '/households', icon: 'bi-house-heart-fill' },
    { label: 'Handover', path: '/handovers', icon: 'bi-clipboard-check-fill' },
    { label: 'Calendar', path: '/calendar', icon: 'bi-calendar-event-fill' },
    { label: 'Notifications', path: '/notifications', icon: 'bi-bell-fill' },
    { label: 'Settings', path: '/settings', icon: 'bi-gear-fill' },
  ];

  isAuthPage(): boolean {
    return this.router.url === '/login';
  }

  openCreateModal(): void {
    this.showCreateModal = true;
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
  }

  openInviteModal(): void {
    this.showInviteModal = true;
  }

  closeInviteModal(): void {
    this.showInviteModal = false;
  }

  triggerSync(): void {
    this.isSyncing = true;
    setTimeout(() => {
      this.isSyncing = false;
      this.toastService.show('Household data synced cleanly with cloud.', 'success');
    }, 800);
  }

  toggleNotifDropdown(): void {
    this.showNotifDropdown = !this.showNotifDropdown;
    this.showProfileMenu = false;
  }

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
    this.showNotifDropdown = false;
  }

  markAllNotificationsRead(): void {
    this.notificationService.markAllAsRead();
    this.toastService.show('All notifications marked as read', 'info');
  }

  logout(): void {
    this.showProfileMenu = false;
    this.authService.logout();
  }
}
