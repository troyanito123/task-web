import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskForm } from './task-form';
import { provideZonelessChangeDetection } from '@angular/core';

describe('TaskForm', () => {
  let component: TaskForm;
  let fixture: ComponentFixture<TaskForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskForm],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit add event with form data when valid', () => {
    spyOn(component.onTaskAction, 'emit');
    component.taskForm.setValue({
      title: 'Tarea',
      description: 'Descripción válida',
    });
    component.onClick('add');
    expect(component.onTaskAction.emit).toHaveBeenCalledWith({
      action: 'add',
      data: { title: 'Tarea', description: 'Descripción válida' },
    });
  });

  it('should emit edit event with form data when valid', () => {
    spyOn(component.onTaskAction, 'emit');
    const task = {
      id: '1',
      title: 'Tarea',
      description: 'Desc',
      completed: false,
      createdAt: new Date(),
    };
    component.taskToEdit = task;
    component.taskForm.setValue({
      title: 'Editada',
      description: 'Descripción editada',
    });
    component.onClick('edit', task);
    expect(component.onTaskAction.emit).toHaveBeenCalledWith({
      action: 'edit',
      data: {
        id: '1',
        title: 'Editada',
        description: 'Descripción editada',
        completed: false,
      },
    });
  });

  it('should emit cancel event', () => {
    spyOn(component.onTaskAction, 'emit');
    component.onClick('cancel');
    expect(component.onTaskAction.emit).toHaveBeenCalledWith({
      action: 'cancel',
      data: null,
    });
  });

  it('should not emit add event if form is invalid', () => {
    spyOn(component.onTaskAction, 'emit');
    component.taskForm.setValue({ title: '', description: '' });
    component.onClick('add');
    expect(component.onTaskAction.emit).not.toHaveBeenCalled();
  });
});
