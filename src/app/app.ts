import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly appName = 'Home Handover';

  readonly navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Households', path: '/households' },
    { label: 'Handover', path: '/handovers' },
    { label: 'Calendar', path: '/calendar' },
    { label: 'Notifications', path: '/notifications' },
    { label: 'Settings', path: '/settings' },
  ];
}
