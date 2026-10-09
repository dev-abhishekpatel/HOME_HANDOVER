import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HandoverService } from '../../core/services/handover.service';
import { HouseholdService } from '../../core/services/household.service';
import { NotificationService } from '../../core/services/notification.service';
import { AuthService } from '../../core/services/auth.service';
import { Task, HouseholdMember } from '../../core/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  readonly handoverService = inject(HandoverService);
  readonly householdService = inject(HouseholdService);
  readonly notificationService = inject(NotificationService);
  readonly authService = inject(AuthService);

  searchQuery = '';
  activeFilter = signal<'All' | 'Pending' | 'In Progress' | 'Completed' | 'Overdue'>('All');

  readonly todayLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  readonly filteredTasks = computed(() => {
    const query = this.searchQuery.trim().toLowerCase();
    const filter = this.activeFilter();
    let list = this.handoverService.tasks();

    if (filter === 'Pending') {
      list = list.filter((t) => t.status === 'Pending' || t.status === 'Assigned' || t.status === 'Acknowledged');
    } else if (filter === 'In Progress') {
      list = list.filter((t) => t.status === 'In Progress');
    } else if (filter === 'Completed') {
      list = list.filter((t) => t.status === 'Completed');
    } else if (filter === 'Overdue') {
      list = list.filter((t) => t.status === 'Overdue');
    }

    if (query) {
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.assignee.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query) ||
          t.notes.toLowerCase().includes(query)
      );
    }

    return list;
  });

  setFilter(filter: 'All' | 'Pending' | 'In Progress' | 'Completed' | 'Overdue'): void {
    this.activeFilter.set(filter);
  }

  updateTaskStatus(task: Task, newStatus: Task['status']): void {
    const actor = this.authService.currentUser()?.name.split(' ')[0];
    this.handoverService.updateTaskStatus(task.id, newStatus, actor);
  }

  deleteTask(task: Task): void {
    this.handoverService.deleteTask(task.id);
  }

  updateMemberAvailability(member: HouseholdMember, newStatus: HouseholdMember['status']): void {
    this.householdService.updateMemberStatus(member.id, newStatus);
  }
}
