import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  readonly preferences = [
    { label: 'Quiet hours', value: '10:00 PM - 7:00 AM' },
    { label: 'Reminder type', value: 'Push + Email' },
    { label: 'Task carryover', value: 'Enabled' },
    { label: 'Family visibility', value: 'Shared' },
  ];
}
