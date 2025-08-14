import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { TaskModel } from '../../../domain/task.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-form',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskForm {
  readonly formBuilder = inject(FormBuilder);
  readonly taskForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
  });
  public task: TaskModel | null = null;

  @Input() set taskToEdit(task: TaskModel | null) {
    this.task = task;
    if (task) {
      this.taskForm.patchValue({
        title: task.title,
        description: task.description,
      });
    } else {
      this.taskForm.reset();
    }
  }

  @Output() onTaskAction = new EventEmitter<{
    action: 'edit' | 'add' | 'cancel';
    data: Partial<TaskModel> | null;
  }>();

  onClick(action: 'edit' | 'add' | 'cancel', data?: Partial<TaskModel>) {
    if (action === 'cancel') {
      this.onTaskAction.emit({ action, data: null });
      return;
    }
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    const { title, description } = this.taskForm.value;
    if (action === 'edit' && data) {
      this.onTaskAction.emit({
        action,
        data: {
          id: data.id,
          title: title!,
          description: description!,
          completed: data.completed,
        },
      });
      return;
    }

    this.onTaskAction.emit({
      action,
      data: { title: title!, description: description! },
    });

    this.taskForm.reset();
  }
}
