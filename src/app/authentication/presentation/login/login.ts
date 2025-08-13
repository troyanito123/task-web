import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { RegisterDialog } from '../components/register-dialog/register-dialog';
import { UserService } from '../../domain/user.service';
import { UserFakeService } from '../../infraestructure/user-fake.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Login {
  readonly formBuilder = inject(FormBuilder);
  readonly dialog = inject(MatDialog);
  readonly router = inject(Router);
  readonly userService = inject(UserFakeService);
  readonly loginForm = this.createLoginForm();

  public async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const user = await this.userService.searchByEmail(
      this.loginForm.value.email
    );
    if (user) {
      await this.router.navigate(['/tasks']);
      return;
    }

    const registerDialog = this.createRegisterDialog(
      this.loginForm.value.email
    );

    registerDialog.afterClosed().subscribe((result) => {
      this.createUser(result);
    });
  }

  public async createUser(email: string | null) {
    if (!email) return;
    await this.userService.create({ email });
    await this.router.navigate(['/tasks']);
  }

  public createRegisterDialog(email: string) {
    return this.dialog.open(RegisterDialog, { data: { email } });
  }

  private createLoginForm(): FormGroup {
    return this.formBuilder.group({
      email: ['mail@mail.com', [Validators.required, Validators.email]],
    });
  }
}
