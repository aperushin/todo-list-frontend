import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { EditCategoryComponent } from "../edit-category/edit-category.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) {
  }

  addCategory(): void {
    this.dialog.open(EditCategoryComponent);
  }

  ngOnInit(): void {
  }

}
