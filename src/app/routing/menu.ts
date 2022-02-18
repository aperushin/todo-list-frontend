import { Menu } from "../models/menu";
import { CategoriesComponent } from "../modules/board/components/categories/categories.component";

export const MENU: Menu[] = [
  {
    name: 'Категории',
    path: 'categories',
    component: CategoriesComponent,
  },
];
