import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { FormValidatorService } from '../../services/form-validator.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { getErrors, setErrorToForm } from '../../helpers/form';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
      console.log('xxx errors', errors);

      setErrorToForm(this.form, errors.apiErrors);

      errors.nonFieldErrors.forEach(error => {
        this.snackBar.open(error, 'Закрыть');
      });

      this.formValidatorService.update();
    });
  }

}
