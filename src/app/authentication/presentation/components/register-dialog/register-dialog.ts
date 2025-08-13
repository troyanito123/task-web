import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-register-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './register-dialog.html',
  styleUrl: './register-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterDialog {
  readonly data = inject<{ email: string }>(MAT_DIALOG_DATA);
}
