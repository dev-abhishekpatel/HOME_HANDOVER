import { Component } from '@angular/core';

@Component({
  selector: 'app-handovers',
  standalone: true,
  templateUrl: './handovers.component.html',
  styleUrl: './handovers.component.css',
})
export class HandoversComponent {
  readonly handovers = [
    {
      title: 'Parcel pickup',
      assignee: 'Aarav',
      deadline: 'Today • 7:30 PM',
      priority: 'High',
      status: 'Assigned',
      instructions: 'Collect parcel from gate security and bring it inside before 8 PM.',
    },
    {
      title: 'Water plants',
      assignee: 'Riya',
      deadline: 'Today • 6:00 PM',
      priority: 'Medium',
      status: 'Acknowledged',
      instructions: 'Use the blue can and check all balcony planters before dinner.',
    },
    {
      title: 'Check gate lock',
      assignee: 'Kabir',
      deadline: 'Tomorrow • 8:00 AM',
      priority: 'High',
      status: 'In Progress',
      instructions: 'Verify the latch and send a photo for proof.',
    },
  ];

  readonly summary = [
    { label: 'Open', value: '11' },
    { label: 'Completed', value: '24' },
    { label: 'Overdue', value: '3' },
  ];
}
