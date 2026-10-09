import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { CalendarComponent } from './features/calendar/calendar.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HandoversComponent } from './features/handovers/handovers.component';
import { HouseholdsComponent } from './features/households/households.component';
import { NotificationsComponent } from './features/notifications/notifications.component';
import { SettingsComponent } from './features/settings/settings.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'households', component: HouseholdsComponent },
  { path: 'handovers', component: HandoversComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: 'dashboard' },
];
