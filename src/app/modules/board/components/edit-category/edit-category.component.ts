import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormValidatorService } from "../../../../services/form-validator.service";
import { FormControl, FormGroup } from "@angular/forms";
import { CategoriesService } from "../../../../services/categories.service";
import { getErrors, setErrorToForm } from "../../../shared/helpers/form";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Category } from "../../../../models/categories";
import { map, Observable, tap } from "rxjs";

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
  });

  private category?: Category;

  constructor(
    private categoriesService: CategoriesService,
    private formValidatorService: FormValidatorService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<undefined>,
    @Inject(MAT_DIALOG_DATA) public data?: Category
  ) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.category = this.data;
      this.form.patchValue(this.category);
    }
  }

  save(): void {
    (this.category ? this.update() : this.create())
      .subscribe(
        message => {
          this.snackBar.open(message, undefined, {
            duration: 2000,
          });
          this.dialogRef.close();
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

  private create(): Observable<string> {
    return this.categoriesService.createCategory(this.form.getRawValue()).pipe(
      map(() => 'Категория создана')
    );
  }

  private update(): Observable<string> {
    return this.categoriesService.updateCategory(this.form.getRawValue(), this.category!.id).pipe(
      map(() => 'Категория сохранена')
    );
  }
}
