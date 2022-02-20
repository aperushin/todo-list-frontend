import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { EditCategoryComponent } from "../edit-category/edit-category.component";
import { DataSource } from "../../../../services/data-source";
import { Category, CategoryWithDetails } from "../../../../models/categories";
import { DataSourceQuery, ResultPage } from "../../../../models/page";
import { debounceTime, Observable } from "rxjs";
import { CategoriesService } from "../../../../services/categories.service";
import { Sort } from "@angular/material/sort";
import { FormControl } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { MatSnackBar } from "@angular/material/snack-bar";

interface SearchForm {
  search: string;
}

@UntilDestroy()
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'title', 'created', 'open', 'edit', 'delete'];
  dataSource: DataSource<Category, SearchForm>;
  isLoading$: Observable<boolean>;
  searchControl = new FormControl('');

  constructor(
    private dialog: MatDialog,
    private categoriesService: CategoriesService,
    private snackBar: MatSnackBar,
  ) {
    this.dataSource = new DataSource<Category, SearchForm>({
        search: '',
      },
      this.loadCategories.bind(this),
      this.categoriesService.reload$,
    );
    this.isLoading$ = this.dataSource.isLoading$;
  }

  addCategory(): void {
    this.dialog.open(EditCategoryComponent);
  }

  editCategory(category: Category): void {
    this.dialog.open(EditCategoryComponent, {
      data: category
    });
  }

  deleteCategory(category: Category): void {
    this.categoriesService.deleteCategory(category.id).subscribe(() => {
      this.snackBar.open('Категория удалена', 'Закрыть', {
        duration: 2000
      })
    });
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(200),
      untilDestroyed(this),
    ).subscribe(search => {
      this.dataSource.searchForm.patchValue({ search });
    })
  }

  ngOnDestroy(): void {
    this.dataSource.destroy();
  }

  sortChange(sortState: Sort): void {
    this.dataSource.setOrderField(sortState.active);
  }

  private loadCategories(query: DataSourceQuery<SearchForm>): Observable<ResultPage<CategoryWithDetails>> {
    return this.categoriesService.loadCategories({
      offset: query.offset,
      limit: query.limit,
      ordering: query.orderField,
      search: query.search.search,
    });
  }

}
