import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HandoverService } from '../../../core/services/handover.service';
import { HouseholdService } from '../../../core/services/household.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-create-handover-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-handover-modal.component.html',
  styleUrl: './create-handover-modal.component.css',
})
export class CreateHandoverModalComponent {
  private handoverService = inject(HandoverService);
  private householdService = inject(HouseholdService);
  private authService = inject(AuthService);

  @Output() close = new EventEmitter<void>();

  title = '';
  assignee = 'Aarav';
  dueTime = 'Today • 8:00 PM';
  priority: 'High' | 'Medium' | 'Low' = 'Medium';
  category: 'Security' | 'Plants' | 'Utilities' | 'Kitchen' | 'Grocery' | 'Maintenance' | 'General' = 'General';
  notes = '';

  readonly members = this.householdService.members;

  onSubmit(): void {
    if (!this.title.trim()) return;

    const currentUser = this.authService.currentUser();
    const createdBy = currentUser ? currentUser.name.split(' ')[0] : 'Admin';

    this.handoverService.addTask({
      title: this.title.trim(),
      assignee: this.assignee,
      due: this.dueTime,
      priority: this.priority,
      status: 'Assigned',
      notes: this.notes.trim() || 'No additional notes provided.',
      category: this.category,
      createdBy,
    });

    this.close.emit();
  }

  onCancel(): void {
    this.close.emit();
  }
}
