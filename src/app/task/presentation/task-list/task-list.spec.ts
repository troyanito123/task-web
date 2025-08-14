import { ComponentFixture, TestBed } from '@angular/core/testing';
import TaskList from './task-list';
import { provideZonelessChangeDetection } from '@angular/core';
import { TaskService } from '../../domain/task.service';
import { UserService } from '../../../authentication/domain/user.service';
import { Router } from '@angular/router';

describe('TaskList', () => {
  let component: TaskList;
  let fixture: ComponentFixture<TaskList>;

  let taskServiceMock: any;
  let userServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    taskServiceMock = {
      getAll: jasmine.createSpy('getAll'),
      create: jasmine.createSpy('create').and.returnValue(Promise.resolve()),
      update: jasmine.createSpy('update').and.returnValue(Promise.resolve()),
      delete: jasmine.createSpy('delete').and.returnValue(Promise.resolve()),
      clean: jasmine.createSpy('clean'),
      list$: { subscribe: () => {} },
    };
    userServiceMock = {
      logout: jasmine.createSpy('logout').and.returnValue(Promise.resolve()),
    };
    routerMock = {
      navigate: jasmine
        .createSpy('navigate')
        .and.returnValue(Promise.resolve()),
    };

    await TestBed.configureTestingModule({
      imports: [TaskList],
      providers: [
        provideZonelessChangeDetection(),
        { provide: TaskService, useValue: taskServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call taskService.create when adding a task', async () => {
    await component.addTask({ title: 'Tarea', description: 'Desc' });
    expect(taskServiceMock.create).toHaveBeenCalledWith({
      title: 'Tarea',
      description: 'Desc',
    });
  });

  it('should call taskService.update when updating a task', async () => {
    await component.updateTask({
      id: '1',
      title: 'Tarea',
      description: 'Desc',
      completed: false,
    });
    expect(taskServiceMock.update).toHaveBeenCalledWith('1', {
      title: 'Tarea',
      description: 'Desc',
      completed: false,
    });
  });

  it('should call taskService.delete when deleting a task', async () => {
    await component.deleteTask('1');
    expect(taskServiceMock.delete).toHaveBeenCalledWith('1');
  });

  it('should call userService.logout, taskService.clean and navigate on logout', async () => {
    await component.logout();
    expect(userServiceMock.logout).toHaveBeenCalled();
    expect(taskServiceMock.clean).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should set taskToEdit$ on editTask', async () => {
    const task = {
      id: '1',
      title: 'Tarea',
      description: 'Desc',
      completed: false,
      createdAt: new Date(),
    };
    const spy = spyOn(component.taskToEdit$, 'next');
    await component.editTask(task);
    expect(spy).toHaveBeenCalledWith(task);
  });

  it('should set taskToEdit$ to null on cancelEdit', () => {
    const spy = spyOn(component.taskToEdit$, 'next');
    component.cancelEdit();
    expect(spy).toHaveBeenCalledWith(null);
  });
});
