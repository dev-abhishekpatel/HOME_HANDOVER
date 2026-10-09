import { Component } from '@angular/core';

@Component({
  selector: 'app-households',
  standalone: true,
  templateUrl: './households.component.html',
  styleUrl: './households.component.css',
})
export class HouseholdsComponent {
  readonly household = {
    name: 'Sharma Residence',
    address: 'A-18, Green Park, New Delhi',
    members: 6,
    tasks: 18,
    progress: '87%',
  };

  readonly members = [
    { name: 'Meera Sharma', role: 'Household Admin', status: 'Online' },
    { name: 'Aarav Sharma', role: 'Task Creator', status: 'In office' },
    { name: 'Riya Sharma', role: 'Family Member', status: 'At home' },
    { name: 'Kabir Sharma', role: 'Family Member', status: 'Busy' },
    { name: 'Naina Sharma', role: 'Guest Access', status: 'Pending' },
  ];

  readonly inviteHistory = [
    'Riya invited to the utility scheduling group',
    'Kabir accepted the gate lock responsibilities',
    'Meera approved parcel handler access',
  ];
}
