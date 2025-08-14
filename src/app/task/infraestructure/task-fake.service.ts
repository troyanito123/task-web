import { Injectable } from '@angular/core';
import { TaskService } from '../domain/task.service';
import { TaskModel } from '../domain/task.model';
import { BehaviorSubject } from 'rxjs';

let TASKS_DB: TaskModel[] = [
  new TaskModel('1', 'Tarea 1', 'Descripción 1', false, new Date()),
  new TaskModel('2', 'Tarea 2', 'Descripción 2', true, new Date()),
];

@Injectable({ providedIn: 'root' })
export class TaskFakeService extends TaskService {
  readonly #list$ = new BehaviorSubject<TaskModel[]>([]);
  readonly list$ = this.#list$.asObservable();

  async getAll(): Promise<TaskModel[]> {
    this.#list$.next(TASKS_DB);
    return TASKS_DB;
  }

  async create(
    task: Pick<TaskModel, 'title' | 'description'>
  ): Promise<TaskModel> {
    const newTask = new TaskModel(
      (TASKS_DB.length + 1).toString(),
      task.title,
      task.description,
      false,
      new Date()
    );
    TASKS_DB.push(newTask);
    this.#list$.next([...TASKS_DB]);
    return newTask;
  }

  async update(
    id: string,
    task: Pick<TaskModel, 'title' | 'description' | 'completed'>
  ): Promise<TaskModel | null> {
    const idx = TASKS_DB.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    const updated = new TaskModel(
      id,
      task.title,
      task.description,
      task.completed,
      TASKS_DB[idx].createdAt
    );
    TASKS_DB = TASKS_DB.map((t) => (t.id === id ? updated : t));
    this.#list$.next(TASKS_DB);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const exists = TASKS_DB.some((t) => t.id === id);
    TASKS_DB = TASKS_DB.filter((t) => t.id !== id);
    this.#list$.next(TASKS_DB);
    return exists;
  }

  override clean(): void {
    TASKS_DB = [];
    this.#list$.next(TASKS_DB);
  }
}
