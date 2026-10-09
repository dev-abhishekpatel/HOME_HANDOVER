export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Household Admin' | 'Task Creator' | 'Family Member' | 'Guest Access';
  avatar: string;
  availability: 'Available' | 'In office' | 'At home' | 'Busy' | 'Away';
  phone?: string;
  householdName: string;
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  assigneeId?: string;
  due: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Assigned' | 'Acknowledged' | 'In Progress' | 'Completed' | 'Overdue';
  notes: string;
  category: 'Security' | 'Plants' | 'Utilities' | 'Kitchen' | 'Grocery' | 'Maintenance' | 'General';
  createdAt: string;
  createdBy: string;
}

export interface HouseholdMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Available' | 'In office' | 'At home' | 'Busy' | 'Away' | 'Pending';
  tasksCount: number;
}

export interface Household {
  id: string;
  name: string;
  address: string;
  members: HouseholdMember[];
  inviteHistory: string[];
}

export interface AppNotification {
  id: string;
  message: string;
  time: string;
  tone: 'success' | 'info' | 'warning' | 'danger';
  read: boolean;
  timestamp: number;
}

export interface CalendarEvent {
  id: string;
  day: string;
  date: string;
  month: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
  category: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'danger';
}
