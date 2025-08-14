import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import Login from './login';
import { UserService } from '../../domain/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let userServiceMock: any;
  let dialogMock: any;
  let routerMock: any;

  beforeEach(async () => {
    userServiceMock = {
      searchByEmail: jasmine.createSpy('searchByEmail'),
      create: jasmine.createSpy('create'),
    };
    dialogMock = {
      open: jasmine
        .createSpy('open')
        .and.returnValue({ afterClosed: () => ({ subscribe: () => {} }) }),
    };
    routerMock = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideZonelessChangeDetection(),
        { provide: UserService, useValue: userServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form as touched and not submit if form is invalid', async () => {
    spyOn(component.loginForm, 'markAllAsTouched');
    component.loginForm.setValue({ email: '' });
    await component.onSubmit();
    expect(component.loginForm.markAllAsTouched).toHaveBeenCalled();
    expect(userServiceMock.searchByEmail).not.toHaveBeenCalled();
  });

  it('should navigate to /tasks if user exists', async () => {
    component.loginForm.setValue({ email: 'test@mail.com' });
    userServiceMock.searchByEmail.and.returnValue(
      Promise.resolve({ id: 1, email: 'test@mail.com' })
    );
    await component.onSubmit();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/tasks']);
  });

  it('should open register dialog if user does not exist', async () => {
    component.loginForm.setValue({ email: 'nouser@mail.com' });
    userServiceMock.searchByEmail.and.returnValue(Promise.resolve(null));
    const afterClosedSpy = jasmine.createSpyObj('afterClosed', ['subscribe']);
    dialogMock.open.and.returnValue({ afterClosed: () => afterClosedSpy });
    await component.onSubmit();
    expect(dialogMock.open).toHaveBeenCalled();
    expect(afterClosedSpy.subscribe).toHaveBeenCalled();
  });
});
