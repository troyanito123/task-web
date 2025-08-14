import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTable } from './task-table';
import { provideZonelessChangeDetection } from '@angular/core';

describe('TaskTable', () => {
  let component: TaskTable;
  let fixture: ComponentFixture<TaskTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTable],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit check event when markCompleted is called', () => {
    spyOn(component.tableAction, 'emit');
    const task = {
      id: '1',
      title: 'Tarea',
      description: 'Desc',
      completed: false,
      createdAt: new Date(),
    };
    component.markCompleted(task, true);
    expect(component.tableAction.emit).toHaveBeenCalledWith({
      action: 'check',
      data: { task, completed: true },
    });
  });

  it('should emit edit event when editTask is called', () => {
    spyOn(component.tableAction, 'emit');
    const task = {
      id: '2',
      title: 'Otra',
      description: 'Desc',
      completed: false,
      createdAt: new Date(),
    };
    component.editTask(task);
    expect(component.tableAction.emit).toHaveBeenCalledWith({
      action: 'edit',
      data: task,
    });
  });

  it('should emit delete event when deleteTask is called', () => {
    spyOn(component.tableAction, 'emit');
    component.deleteTask('3');
    expect(component.tableAction.emit).toHaveBeenCalledWith({
      action: 'delete',
      data: '3',
    });
  });
});
