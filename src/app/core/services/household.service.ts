import { Injectable, signal, inject } from '@angular/core';
import { HouseholdMember } from '../models';
import { ToastService } from './toast.service';

const INITIAL_MEMBERS: HouseholdMember[] = [
  { id: 'm1', name: 'Meera Sharma', email: 'meera@homehandover.com', role: 'Household Admin', status: 'Available', tasksCount: 6 },
  { id: 'm2', name: 'Aarav Sharma', email: 'aarav@homehandover.com', role: 'Task Creator', status: 'In office', tasksCount: 4 },
  { id: 'm3', name: 'Riya Sharma', email: 'riya@homehandover.com', role: 'Family Member', status: 'At home', tasksCount: 5 },
  { id: 'm4', name: 'Kabir Sharma', email: 'kabir@homehandover.com', role: 'Family Member', status: 'Busy', tasksCount: 3 },
  { id: 'm5', name: 'Naina Sharma', email: 'naina@homehandover.com', role: 'Guest Access', status: 'Pending', tasksCount: 1 },
];

const INITIAL_INVITES = [
  'Riya invited to the utility scheduling group',
  'Kabir accepted the gate lock responsibilities',
  'Meera approved parcel handler access',
];

const STORAGE_KEY_MEMBERS = 'home_handover_members';
const STORAGE_KEY_INVITES = 'home_handover_invites';

@Injectable({
  providedIn: 'root',
})
export class HouseholdService {
  private toast = inject(ToastService);

  readonly householdName = signal<string>('Sharma Residence');
  readonly householdAddress = signal<string>('A-18, Green Park, New Delhi');
  readonly members = signal<HouseholdMember[]>(this.loadMembers());
  readonly inviteHistory = signal<string[]>(this.loadInvites());

  private loadMembers(): HouseholdMember[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_MEMBERS);
      return stored ? JSON.parse(stored) : INITIAL_MEMBERS;
    } catch {
      return INITIAL_MEMBERS;
    }
  }

  private loadInvites(): string[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_INVITES);
      return stored ? JSON.parse(stored) : INITIAL_INVITES;
    } catch {
      return INITIAL_INVITES;
    }
  }

  private saveMembers(list: HouseholdMember[]): void {
    this.members.set(list);
    try {
      localStorage.setItem(STORAGE_KEY_MEMBERS, JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
  }

  addMember(name: string, email: string, role: string): void {
    const newMember: HouseholdMember = {
      id: 'm_' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      role: role || 'Family Member',
      status: 'Pending',
      tasksCount: 0,
    };

    const updated = [...this.members(), newMember];
    this.saveMembers(updated);

    const inviteText = `Invited ${newMember.name} (${newMember.role}) via ${newMember.email}`;
    const newInvites = [inviteText, ...this.inviteHistory()];
    this.inviteHistory.set(newInvites);
    try {
      localStorage.setItem(STORAGE_KEY_INVITES, JSON.stringify(newInvites));
    } catch (e) {
      console.error(e);
    }

    this.toast.show(`Invite sent to ${newMember.name}!`, 'success');
  }

  updateMemberStatus(id: string, status: HouseholdMember['status']): void {
    const updated = this.members().map((m) => (m.id === id ? { ...m, status } : m));
    this.saveMembers(updated);
    this.toast.show(`Status updated to ${status}`, 'info');
  }

  removeMember(id: string): void {
    const target = this.members().find((m) => m.id === id);
    if (!target) return;

    const updated = this.members().filter((m) => m.id !== id);
    this.saveMembers(updated);
    this.toast.show(`Removed ${target.name} from household.`, 'info');
  }
}
