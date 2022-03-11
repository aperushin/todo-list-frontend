import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, finalize } from "rxjs";
import { FormControl, FormGroup } from "@angular/forms";
import { BotApiService } from "../../../../services/bot-api.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { FormValidatorService } from "../../../../services/form-validator.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialogRef } from "@angular/material/dialog";

@UntilDestroy()
@Component({
  selector: 'app-bot-verification',
  templateUrl: './bot-verification.component.html',
  styleUrls: ['./bot-verification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormValidatorService],
})
export class BotVerificationComponent {
  isLoading$ = new BehaviorSubject(false);
  form = new FormGroup({
    verification_code: new FormControl('')
  });

  constructor(
    private botApiService: BotApiService,
    private formValidatorService: FormValidatorService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<undefined>,
  ) {
  }

  save(): void {
    this.isLoading$.next(false);
    this.botApiService.verify(this.form.getRawValue()).pipe(
      finalize(() => this.isLoading$.next(false)),
      untilDestroyed(this),
    ).subscribe(() => {
      this.snackBar.open('Успешная валидация', undefined, {
        duration: 2000,
      });
      this.dialogRef.close();
    }, http => {
      this.formValidatorService.setErrors(http, this.form);
    })
  }

}
