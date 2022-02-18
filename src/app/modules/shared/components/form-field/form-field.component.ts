import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, merge, Observable } from 'rxjs';
import { FormValidatorService } from "../../../../services/form-validator.service";

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {
  @Input() placeholder = '';
  @Input() control!: FormControl;

  isError$!: Observable<boolean>;

  constructor(
    private formValidatorService: FormValidatorService,
  ) {
  }

  ngOnInit(): void {
    this.isError$ = merge(
      this.formValidatorService.update$,
      this.control.valueChanges,
    ).pipe(
      map(() => !this.control.valid)
    );
  }

  getErrorMessage(): string {
    return this.control.errors ? Object.values(this.control.errors).join(',') : '';
  }

}
