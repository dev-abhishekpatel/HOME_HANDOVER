import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  standalone: true,
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  readonly notifications = [
    { message: 'Aarav acknowledged the parcel pickup task.', time: '5 min ago', tone: 'success' },
    { message: 'Riya added a note to the plant care task.', time: '22 min ago', tone: 'info' },
    { message: 'Gate lock task is overdue by 1 hour.', time: '45 min ago', tone: 'warning' },
    { message: 'Meera created a household reminder for tomorrow morning.', time: '2 hours ago', tone: 'info' },
  ];
}
