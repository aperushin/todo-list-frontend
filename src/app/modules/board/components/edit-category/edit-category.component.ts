import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormValidatorService } from "../../../../services/form-validator.service";
import { FormControl, FormGroup } from "@angular/forms";
import { CategoriesService } from "../../../../services/categories.service";
import { getErrors, setErrorToForm } from "../../../shared/helpers/form";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormValidatorService],
})
export class EditCategoryComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('')
  })

  constructor(
    private categoriesService: CategoriesService,
    private formValidatorService: FormValidatorService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
  }

  save(): void {
    this.categoriesService
      .createCategory(this.form.getRawValue())
      .subscribe(
        () => {
          this.snackBar.open('Категория создана', '', {
            duration: 2000
          })
        },
        http => {
          const errors = getErrors(http);
          setErrorToForm(this.form, errors.apiErrors);

          errors.nonFieldErrors.forEach(error => {
            this.snackBar.open(error, 'Закрыть');
          });

          this.formValidatorService.update();
        }
      )
  }
}
