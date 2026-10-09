import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HouseholdService } from '../../core/services/household.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  readonly authService = inject(AuthService);
  readonly householdService = inject(HouseholdService);
  private toast = inject(ToastService);

  userName = this.authService.currentUser()?.name || '';
  userEmail = this.authService.currentUser()?.email || '';
  userPhone = this.authService.currentUser()?.phone || '+91 98765 43210';
  householdName = this.householdService.householdName();

  quietHours = '10:00 PM - 7:00 AM';
  reminderType = 'Push + Email';
  taskCarryover = true;
  familyVisibility = true;

  saveProfile(): void {
    this.authService.updateProfile({
      name: this.userName,
      email: this.userEmail,
      phone: this.userPhone,
      householdName: this.householdName,
    });
    this.householdService.householdName.set(this.householdName);
  }

  savePreferences(): void {
    this.toast.show('System preferences saved successfully!', 'success');
  }
}
