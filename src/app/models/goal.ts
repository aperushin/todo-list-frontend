import { Entity } from "./base";
import { Category } from "./categories";

export enum GoalStatus {
  toDo = 1,
  inProgress = 2,
  done = 3,
  archived = 4,
}

export enum GoalPriority {
  low = 1,
  medium = 2,
  high = 3,
  critical = 4,
}

export interface GoalData {
  title: string;
  description: string;
  status: GoalStatus;
  due_date: string;
  category: number;
  priority: GoalPriority;
  board: number;
}

export interface Goal extends GoalData {
  id: number;
  created: string;
  updated: string;
}

export interface GoalWithDetails extends Omit<Goal, 'category' | 'priority' | 'status'> {
  category: Category;
  status: Entity<GoalStatus>;
  priority: Entity<GoalPriority>;
}

export const GOAL_STATUS_LIST: Entity<GoalStatus>[] = [
  { id: GoalStatus.toDo, title: 'To do' },
  { id: GoalStatus.inProgress, title: 'In progress' },
  { id: GoalStatus.done, title: 'Done' },
];

export const PRIORITY_STATUS_LIST: Entity<GoalPriority>[] = [
  { id: GoalPriority.low, title: 'Low' },
  { id: GoalPriority.medium, title: 'Medium' },
  { id: GoalPriority.high, title: 'High' },
  { id: GoalPriority.critical, title: 'Critical' },
];

export interface GoalsRequest {
  board?: number;
  ordering?: string;
  search?: string;
  priority?: string;
  priority__in?: string;
  category?: number;
  category__in?: string;
  status?: number;
  status__in?: string;
  due_date__lte?: string | null;
  due_date__gte?: string | null;
  limit: number;
  offset: number;
}
