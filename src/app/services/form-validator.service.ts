import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class FormValidatorService {
  update$ = new Subject<void>();

  update(): void {
    this.update$.next();
  }
}
