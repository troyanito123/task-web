import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskModel } from '../../domain/task.model';
import { TaskService } from '../../domain/task.service';
import { BehaviorSubject } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from '../../../authentication/domain/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TaskList {
  readonly taskService = inject(TaskService);
  readonly userService = inject(UserService);
  readonly router = inject(Router);
  readonly taskList$ = this.taskService.list$;
  readonly formBuilder = inject(FormBuilder);
  readonly taskForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
  });

  readonly taskToEdit$ = new BehaviorSubject<TaskModel | null>(null);

  constructor() {
    this.taskService.getAll();
  }

  async addTask() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    const { title, description } = this.taskForm.value;
    await this.taskService.create({ title: title!, description: description! });
    this.taskForm.reset();
  }
  async updateTask(task: TaskModel) {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    const { title, description } = this.taskForm.value;
    await this.taskService.update(task.id, {
      title: title!,
      description: description!,
      completed: task.completed,
    });
    this.taskToEdit$.next(null);
    this.taskForm.reset();
  }

  async deleteTask(id: string) {
    await this.taskService.delete(id);
  }

  async editTask(task: TaskModel) {
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
    });
    this.taskToEdit$.next(task);
  }

  cancelEdit() {
    this.taskForm.reset();
    this.taskToEdit$.next(null);
  }

  markCompleted(task: TaskModel, completed: boolean) {
    this.taskService.update(task.id, {
      title: task.title,
      description: task.description,
      completed,
    });
  }

  async logout() {
    await this.userService.logout();
    await this.router.navigate(['/login']);
  }
}
