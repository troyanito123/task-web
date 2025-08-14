import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TaskModel } from '../../../domain/task.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-table',
  imports: [MatCardModule, MatCheckboxModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './task-table.html',
  styleUrl: './task-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskTable {
  @Input() tasks: TaskModel[] = [];

  @Output() tableAction = new EventEmitter<{
    action: 'edit' | 'delete' | 'check';
    data: any;
  }>();

  markCompleted(task: TaskModel, completed: boolean) {
    this.tableAction.emit({ action: 'check', data: { task, completed } });
  }

  editTask(task: TaskModel) {
    this.tableAction.emit({ action: 'edit', data: task });
  }

  deleteTask(taskId: string) {
    this.tableAction.emit({ action: 'delete', data: taskId });
  }

  isMobileScreen(): boolean {
    return window.innerWidth <= 600;
  }
}
