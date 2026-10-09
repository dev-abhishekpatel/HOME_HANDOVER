import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HandoverService } from '../../core/services/handover.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  readonly handoverService = inject(HandoverService);
  private toast = inject(ToastService);

  readonly monthLabel = 'October 2026';
  selectedDate = '12';

  newEventTitle = '';
  newEventPriority: 'High' | 'Medium' | 'Low' = 'Medium';
  newEventAssignee = 'Aarav';

  readonly calendarEvents = computed(() => {
    const tasks = this.handoverService.tasks();
    return tasks.map((t, idx) => ({
      id: t.id,
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx % 7],
      date: (10 + (idx % 15)).toString(),
      title: t.title,
      type: t.priority,
      assignee: t.assignee,
      status: t.status,
    }));
  });

  selectDate(dateStr: string): void {
    this.selectedDate = dateStr;
  }

  addQuickEvent(): void {
    if (!this.newEventTitle.trim()) return;

    this.handoverService.addTask({
      title: this.newEventTitle.trim(),
      assignee: this.newEventAssignee,
      due: `October ${this.selectedDate} • 6:00 PM`,
      priority: this.newEventPriority,
      status: 'Assigned',
      notes: 'Scheduled via Calendar quick planner.',
      category: 'General',
      createdBy: 'Meera',
    });

    this.newEventTitle = '';
  }
}
