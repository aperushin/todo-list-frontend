import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category, CategoryRequest } from "../models/categories";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GoalsApiService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  createCategory(form: CategoryRequest): Observable<Category> {
    return this.httpClient.post<Category>(environment.apiEndpoint + 'goals/goal_category/create', form);
  }
}
