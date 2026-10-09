import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HouseholdService } from '../../core/services/household.service';
import { HandoverService } from '../../core/services/handover.service';
import { HouseholdMember } from '../../core/models';

@Component({
  selector: 'app-households',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './households.component.html',
  styleUrl: './households.component.css',
})
export class HouseholdsComponent {
  readonly householdService = inject(HouseholdService);
  readonly handoverService = inject(HandoverService);

  showInviteModal = false;

  updateMemberStatus(member: HouseholdMember, newStatus: HouseholdMember['status']): void {
    this.householdService.updateMemberStatus(member.id, newStatus);
  }

  removeMember(member: HouseholdMember): void {
    this.householdService.removeMember(member.id);
  }
}
