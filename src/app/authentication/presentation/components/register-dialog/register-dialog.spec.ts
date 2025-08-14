import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { RegisterDialog } from './register-dialog';
import { provideZonelessChangeDetection } from '@angular/core';

describe('RegisterDialog', () => {
  let component: RegisterDialog;
  let fixture: ComponentFixture<RegisterDialog>;
  const testEmail = 'test@example.com';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterDialog, MatDialogModule],
      providers: [
        provideZonelessChangeDetection(),
        { provide: MAT_DIALOG_DATA, useValue: { email: testEmail } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the provided email', () => {
    const emailElement =
      fixture.debugElement.nativeElement.querySelector('strong');
    expect(emailElement.textContent).toContain(testEmail);
  });

  it('should have a "No, gracias" button', () => {
    const noButton = fixture.debugElement.queryAll(By.css('button'))[0];
    expect(noButton.nativeElement.textContent).toContain('No, gracias');
  });

  it('should have a "Si, crear usuario" button', () => {
    const yesButton = fixture.debugElement.queryAll(By.css('button'))[1];
    expect(yesButton.nativeElement.textContent).toContain('Si, crear usuario');
  });
});
