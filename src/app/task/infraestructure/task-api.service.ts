import {
  BehaviorSubject,
  catchError,
  first,
  lastValueFrom,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';
import { TaskModel } from '../domain/task.model';
import { TaskService } from '../domain/task.service';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskApiSerivce extends TaskService {
  readonly #list$ = new BehaviorSubject<TaskModel[]>([]);
  readonly list$ = this.#list$.asObservable();
  readonly http = inject(HttpClient);
  readonly baseUrl = `${environment.apiUrl}/tasks-service`;
  override getAll(): Promise<TaskModel[]> {
    return lastValueFrom(
      this.http.get<any[]>(`${this.baseUrl}`).pipe(
        map((res) => res.map((d) => TaskModel.fromJson(d))),
        tap((tasks) => this.#list$.next(tasks)),
        catchError(() => of([])),
        first()
      )
    );
  }
  override create(
    task: Pick<TaskModel, 'title' | 'description'>
  ): Promise<TaskModel | null> {
    return lastValueFrom(
      this.http.post<any>(`${this.baseUrl}`, task).pipe(
        map((res) => TaskModel.fromJson(res)),
        tap((task) => this.#list$.next([...this.#list$.value, task])),
        catchError(() => of(null)),
        first()
      )
    );
  }
  override update(
    id: string,
    task: Pick<TaskModel, 'title' | 'description' | 'completed'>
  ): Promise<TaskModel | null> {
    return lastValueFrom(
      this.http.put<any>(`${this.baseUrl}/${id}`, task).pipe(
        map((res) => TaskModel.fromJson(res)),
        tap((task) => {
          const listTask = this.#list$.value.map((t) =>
            t.id === id ? task : t
          );
          this.#list$.next(listTask);
        }),
        catchError(() => of(null)),
        first()
      )
    );
  }
  override delete(id: string): Promise<boolean> {
    return lastValueFrom(
      this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
        map(() => true),
        tap(() => {
          const listTask = this.#list$.value.filter((t) => t.id !== id);
          this.#list$.next(listTask);
        }),
        catchError(() => of(false)),
        first()
      )
    );
  }
}
