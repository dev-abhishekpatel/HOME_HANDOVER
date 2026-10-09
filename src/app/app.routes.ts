import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { CalendarComponent } from './features/calendar/calendar.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HandoversComponent } from './features/handovers/handovers.component';
import { HouseholdsComponent } from './features/households/households.component';
import { NotificationsComponent } from './features/notifications/notifications.component';
import { SettingsComponent } from './features/settings/settings.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'households', component: HouseholdsComponent, canActivate: [authGuard] },
  { path: 'handovers', component: HandoversComponent, canActivate: [authGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [authGuard] },
  { path: 'notifications', component: NotificationsComponent, canActivate: [authGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'dashboard' },
];
