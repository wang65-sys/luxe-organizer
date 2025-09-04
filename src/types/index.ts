export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  completedAt?: Date;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  location?: string;
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
}

export interface GoalSection {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: Date;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  sections: GoalSection[];
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
}

export interface ArchivedItem {
  id: string;
  type: 'task' | 'event' | 'goal';
  originalData: Task | Event | Goal;
  archivedAt: Date;
}

export interface Settings {
  darkMode: boolean;
  ringDuration: number; // in seconds
  snoozeDuration: number; // in minutes
  selectedRingtone: string;
  customRingtones: string[];
}

export type ItemType = 'task' | 'event' | 'goal';