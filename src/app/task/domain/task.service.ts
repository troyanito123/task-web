import { Observable } from 'rxjs';
import { TaskModel } from './task.model';

export abstract class TaskService {
  abstract getAll(): Promise<TaskModel[]>;
  abstract create(task: Pick<TaskModel, 'title' | 'description'>): Promise<TaskModel>;
  abstract update(id: string, task: Pick<TaskModel, 'title' | 'description' | 'completed'>): Promise<TaskModel | null>;
  abstract delete(id: string): Promise<boolean>;
  abstract list$: Observable<TaskModel[]>;
}
