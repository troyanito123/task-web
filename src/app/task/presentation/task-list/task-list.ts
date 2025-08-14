import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskModel } from '../../domain/task.model';
import { TaskService } from '../../domain/task.service';
import { BehaviorSubject } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from '../../../authentication/domain/user.service';
import { Router } from '@angular/router';
import { TaskForm } from '../components/task-form/task-form';
import { TaskTable } from '../components/task-table/task-table';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    AsyncPipe,
    TaskForm,
    TaskTable,
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

  readonly taskToEdit$ = new BehaviorSubject<TaskModel | null>(null);

  constructor() {
    this.taskService.getAll();
  }

  async handleTaskAction(event: {
    action: 'edit' | 'add' | 'cancel';
    data: Partial<TaskModel> | null;
  }) {
    switch (event.action) {
      case 'edit':
        this.updateTask(event.data!);
        break;
      case 'add':
        this.addTask(event.data!);
        break;
      case 'cancel':
        this.cancelEdit();
        break;
    }
  }

  handleTableAction(event: { action: 'edit' | 'delete' | 'check'; data: any }) {
    switch (event.action) {
      case 'edit':
        this.editTask(event.data);
        break;
      case 'delete':
        this.deleteTask(event.data);
        break;
      case 'check':
        this.markCompleted(event.data.task, event.data.completed);
        break;
    }
  }

  async addTask(data: Partial<TaskModel>) {
    const { title, description } = data;
    await this.taskService.create({ title: title!, description: description! });
  }

  async updateTask(task: Partial<TaskModel>) {
    await this.taskService.update(task.id!, {
      title: task.title!,
      description: task.description!,
      completed: task.completed!,
    });
    this.taskToEdit$.next(null);
  }

  cancelEdit() {
    this.taskToEdit$.next(null);
  }

  async deleteTask(id: string) {
    await this.taskService.delete(id);
  }

  async editTask(task: TaskModel) {
    this.taskToEdit$.next(task);
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
    this.taskService.clean();
    await this.router.navigate(['/login']);
  }

  isMobileScreen(): boolean {
    return window.innerWidth <= 600;
  }
}
