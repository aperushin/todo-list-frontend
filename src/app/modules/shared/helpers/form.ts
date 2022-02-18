import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

export type ApiErrors = Record<string, string[]>;

export function setErrorToForm(form: FormGroup, errors: ApiErrors): void {
  Object.entries(errors).forEach(([field, errorList]) => {
    const errorMap = errorList.reduce((obj, value, index) => {
      // @ts-ignore
      obj['apiError' + index] = value;
      return obj;
    }, {});

    form.controls[field].setErrors(errorMap, { emitEvent: true });
  })
}

export function getErrors(httpError: HttpErrorResponse): { nonFieldErrors: string[], apiErrors: ApiErrors } {
  if (httpError.status === 500) {
    return {
      apiErrors: {},
      nonFieldErrors: ['Server error 500']
    }
  }

  const { non_field_errors, detail, ...apiErrors } = httpError.error;
  const nonFieldErrors = non_field_errors || [];

  if (detail) {
    nonFieldErrors.push(detail);
  }

  return {
    apiErrors: apiErrors || {},
    nonFieldErrors,
  }
}
