import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HandoverService } from '../../core/services/handover.service';
import { AuthService } from '../../core/services/auth.service';
import { Task } from '../../core/models';

@Component({
  selector: 'app-handovers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './handovers.component.html',
  styleUrl: './handovers.component.css',
})
export class HandoversComponent {
  readonly handoverService = inject(HandoverService);
  private authService = inject(AuthService);

  searchQuery = '';
  priorityFilter = 'All';
  statusFilter = 'All';

  readonly filteredHandovers = computed(() => {
    let list = this.handoverService.tasks();
    const query = this.searchQuery.trim().toLowerCase();

    if (this.priorityFilter !== 'All') {
      list = list.filter((t) => t.priority === this.priorityFilter);
    }

    if (this.statusFilter !== 'All') {
      list = list.filter((t) => t.status === this.statusFilter);
    }

    if (query) {
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.assignee.toLowerCase().includes(query) ||
          t.notes.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query)
      );
    }

    return list;
  });

  updateStatus(task: Task, newStatus: Task['status']): void {
    const actor = this.authService.currentUser()?.name.split(' ')[0];
    this.handoverService.updateTaskStatus(task.id, newStatus, actor);
  }

  deleteTask(task: Task): void {
    this.handoverService.deleteTask(task.id);
  }
}
