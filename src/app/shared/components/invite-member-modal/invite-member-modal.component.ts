import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HouseholdService } from '../../../core/services/household.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-invite-member-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invite-member-modal.component.html',
  styleUrl: './invite-member-modal.component.css',
})
export class InviteMemberModalComponent {
  private householdService = inject(HouseholdService);
  private toast = inject(ToastService);

  @Output() close = new EventEmitter<void>();

  memberName = '';
  email = '';
  role = 'Family Member';
  inviteLink = 'https://homehandover.app/join?code=HH-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  onSubmit(): void {
    if (!this.memberName.trim() || !this.email.trim()) return;

    this.householdService.addMember(this.memberName, this.email, this.role);
    this.close.emit();
  }

  copyInviteLink(): void {
    navigator.clipboard.writeText(this.inviteLink);
    this.toast.show('Invite link copied to clipboard!', 'success');
  }

  onCancel(): void {
    this.close.emit();
  }
}
