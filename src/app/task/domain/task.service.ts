import { TaskModel } from './task.model';

export interface TaskService {
  getAll(): Promise<TaskModel[]>;
  create(task: Pick<TaskModel, 'title' | 'description'>): Promise<TaskModel>;
  update(id: string, task: Omit<TaskModel, 'id' | 'createdAt'>): Promise<TaskModel | null>;
  delete(id: string): Promise<boolean>;
}
