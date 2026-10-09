import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  readonly todayLabel = 'Friday, 10 October';

  readonly stats = [
    { label: 'Today tasks', value: '08', change: '+2 from yesterday', tone: 'primary' },
    { label: 'Pending', value: '12', change: '3 due today', tone: 'warning' },
    { label: 'Completed', value: '24', change: '+6 this week', tone: 'success' },
    { label: 'Overdue', value: '03', change: 'Needs attention', tone: 'danger' },
  ];

  readonly tasks = [
    {
      title: 'Parcel collection from gate security',
      owner: 'Aarav',
      due: 'Today • 7:30 PM',
      priority: 'High',
      status: 'Assigned',
      notes: 'Bring the brown parcel to the kitchen table and confirm with Meera.',
    },
    {
      title: 'Water the balcony plants',
      owner: 'Riya',
      due: 'Today • 6:00 PM',
      priority: 'Medium',
      status: 'Acknowledged',
      notes: 'Use the blue watering can and check the herbs in the corner tray.',
    },
    {
      title: 'Check main gate lock',
      owner: 'Kabir',
      due: 'Tomorrow • 8:00 AM',
      priority: 'High',
      status: 'In Progress',
      notes: 'Verify the gate is latched and photograph the lock before leaving.',
    },
    {
      title: 'Electrician visit confirmation',
      owner: 'Meera',
      due: 'Today • 5:00 PM',
      priority: 'High',
      status: 'Completed',
      notes: 'Confirmed appointment window between 4:00 PM and 5:30 PM.',
    },
  ];

  readonly familyMembers = [
    { name: 'Meera', role: 'Household Admin', tasks: 6, availability: 'Available' },
    { name: 'Aarav', role: 'Task Creator', tasks: 4, availability: 'In office' },
    { name: 'Riya', role: 'Family Member', tasks: 5, availability: 'At home' },
    { name: 'Kabir', role: 'Family Member', tasks: 3, availability: 'Busy' },
  ];

  readonly activity = [
    'Meera created a new handover for parcel collection.',
    'Kabir updated the gate status to “In Progress”.',
    'Aarav uploaded a photo for the package receipt.',
    'Riya completed the kitchen checklist for dinner prep.',
  ];

  readonly notifications = [
    { message: 'Aarav acknowledged the parcel pickup task.', time: '5 min ago', tone: 'success' },
    { message: 'Riya added a new note for the plant care task.', time: '22 min ago', tone: 'info' },
    { message: 'Electrician visit is still pending confirmation.', time: '1 hour ago', tone: 'warning' },
  ];

  updateTask(task: { status: string }, action: 'acknowledge' | 'complete'): void {
    task.status = action === 'acknowledge' ? 'Acknowledged' : 'Completed';
  }
}
