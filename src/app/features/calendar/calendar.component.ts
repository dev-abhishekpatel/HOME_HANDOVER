import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  readonly monthLabel = 'October 2026';
  readonly events = [
    { day: 'Mon', date: '12', title: 'Parcel delivery', type: 'High' },
    { day: 'Tue', date: '13', title: 'Plant care', type: 'Medium' },
    { day: 'Wed', date: '14', title: 'Electrician call', type: 'High' },
    { day: 'Thu', date: '15', title: 'Groceries', type: 'Low' },
  ];
}
