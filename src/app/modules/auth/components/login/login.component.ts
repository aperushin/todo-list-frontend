import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormValidatorService } from "../../../../services/form-validator.service";
import { UserService } from "../../../../services/user.service";
import { getErrors, setErrorToForm } from "../../../shared/helpers/form";

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormValidatorService],
})
export class LoginComponent {
  vkAuthLink = this.userService.vkAuthLink;
  form = this.fb.group({
    username: '',
    password: '',
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private formValidatorService: FormValidatorService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  onSend(): void {
    this.userService.login(this.form.getRawValue()).pipe(
      untilDestroyed(this),
    ).subscribe(res => {
      this.router.navigateByUrl('/');
      this.snackBar.open('Успешная авторизация', 'Закрыть', {
        duration: 2000
      });
    }, error => {
      const errors = getErrors(error);

      setErrorToForm(this.form, errors.apiErrors);

      errors.nonFieldErrors.forEach(error => {
        this.snackBar.open(error, 'Закрыть');
      });

      this.formValidatorService.update();
    });
  }

}
