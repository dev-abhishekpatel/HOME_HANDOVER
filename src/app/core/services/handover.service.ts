import { Injectable, computed, signal, inject } from '@angular/core';
import { Task } from '../models';
import { NotificationService } from './notification.service';
import { ToastService } from './toast.service';

const INITIAL_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Parcel collection from gate security',
    assignee: 'Aarav',
    due: 'Today • 7:30 PM',
    priority: 'High',
    status: 'Assigned',
    notes: 'Bring the brown parcel to the kitchen table and confirm with Meera.',
    category: 'Security',
    createdAt: new Date().toISOString(),
    createdBy: 'Meera',
  },
  {
    id: 't2',
    title: 'Water the balcony plants',
    assignee: 'Riya',
    due: 'Today • 6:00 PM',
    priority: 'Medium',
    status: 'Acknowledged',
    notes: 'Use the blue watering can and check the herbs in the corner tray.',
    category: 'Plants',
    createdAt: new Date().toISOString(),
    createdBy: 'Meera',
  },
  {
    id: 't3',
    title: 'Check main gate lock & latch',
    assignee: 'Kabir',
    due: 'Tomorrow • 8:00 AM',
    priority: 'High',
    status: 'In Progress',
    notes: 'Verify the gate is latched and photograph the lock before leaving.',
    category: 'Security',
    createdAt: new Date().toISOString(),
    createdBy: 'Aarav',
  },
  {
    id: 't4',
    title: 'Electrician visit confirmation',
    assignee: 'Meera',
    due: 'Today • 5:00 PM',
    priority: 'High',
    status: 'Completed',
    notes: 'Confirmed appointment window between 4:00 PM and 5:30 PM.',
    category: 'Maintenance',
    createdAt: new Date().toISOString(),
    createdBy: 'Meera',
  },
  {
    id: 't5',
    title: 'Restock kitchen groceries & milk',
    assignee: 'Riya',
    due: 'Today • 9:00 PM',
    priority: 'Medium',
    status: 'Pending',
    notes: 'Buy 2L organic milk, eggs, sourdough bread, and fresh tomatoes.',
    category: 'Grocery',
    createdAt: new Date().toISOString(),
    createdBy: 'Riya',
  },
];

const INITIAL_ACTIVITIES = [
  'Meera created a new handover for parcel collection.',
  'Kabir updated the gate status to “In Progress”.',
  'Aarav uploaded a photo for the package receipt.',
  'Riya completed the kitchen checklist for dinner prep.',
];

const STORAGE_KEY_TASKS = 'home_handover_tasks';
const STORAGE_KEY_ACTIVITY = 'home_handover_activities';

@Injectable({
  providedIn: 'root',
})
export class HandoverService {
  private notificationService = inject(NotificationService);
  private toastService = inject(ToastService);

  readonly tasks = signal<Task[]>(this.loadTasksFromStorage());
  readonly activities = signal<string[]>(this.loadActivitiesFromStorage());

  readonly stats = computed(() => {
    const list = this.tasks();
    const total = list.length;
    const pending = list.filter((t) => t.status === 'Pending' || t.status === 'Assigned' || t.status === 'Acknowledged').length;
    const inProgress = list.filter((t) => t.status === 'In Progress').length;
    const completed = list.filter((t) => t.status === 'Completed').length;
    const overdue = list.filter((t) => t.status === 'Overdue').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 100;

    return { total, pending, inProgress, completed, overdue, completionRate };
  });

  private loadTasksFromStorage(): Task[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_TASKS);
      return stored ? JSON.parse(stored) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  }

  private loadActivitiesFromStorage(): string[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ACTIVITY);
      return stored ? JSON.parse(stored) : INITIAL_ACTIVITIES;
    } catch {
      return INITIAL_ACTIVITIES;
    }
  }

  private saveTasks(tasks: Task[]): void {
    this.tasks.set(tasks);
    try {
      localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }

  private addActivityLog(message: string): void {
    const updated = [message, ...this.activities().slice(0, 15)];
    this.activities.set(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVITY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  }

  addTask(taskData: Omit<Task, 'id' | 'createdAt'>): void {
    const newTask: Task = {
      ...taskData,
      id: 't_' + Date.now(),
      createdAt: new Date().toISOString(),
    };

    const updated = [newTask, ...this.tasks()];
    this.saveTasks(updated);

    const logMsg = `${newTask.createdBy} assigned "${newTask.title}" to ${newTask.assignee}.`;
    this.addActivityLog(logMsg);
    this.notificationService.addNotification(`New handover created: "${newTask.title}" assigned to ${newTask.assignee}.`, 'info');
    this.toastService.show(`Handover "${newTask.title}" created successfully!`, 'success');
  }

  updateTaskStatus(id: string, newStatus: Task['status'], actorName?: string): void {
    const currentList = this.tasks();
    const target = currentList.find((t) => t.id === id);
    if (!target) return;

    const updated = currentList.map((t) => (t.id === id ? { ...t, status: newStatus } : t));
    this.saveTasks(updated);

    const actor = actorName || target.assignee;
    const logMsg = `${actor} updated status of "${target.title}" to "${newStatus}".`;
    this.addActivityLog(logMsg);

    const tone = newStatus === 'Completed' ? 'success' : newStatus === 'Overdue' ? 'warning' : 'info';
    this.notificationService.addNotification(`Task "${target.title}" status changed to ${newStatus}.`, tone);
    this.toastService.show(`Status updated: ${newStatus}`, 'success');
  }

  deleteTask(id: string): void {
    const currentList = this.tasks();
    const target = currentList.find((t) => t.id === id);
    if (!target) return;

    const updated = currentList.filter((t) => t.id !== id);
    this.saveTasks(updated);

    this.toastService.show(`Handover "${target.title}" deleted`, 'info');
  }
}
