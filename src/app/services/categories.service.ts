import { Injectable } from '@angular/core';
import { GoalsApiService } from "./goals-api.service";
import { Observable, Subject, tap } from "rxjs";
import { CategoryRequest } from "../models/categories";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private reload$ = new Subject<void>();

  constructor(
    private goalsApiService: GoalsApiService,
  ) {
  }

  createCategory(form: CategoryRequest): Observable<{ id: number }> {
    return this.goalsApiService.createCategory(form).pipe(
      tap(() => this.reload$.next())
    );
  }
}
