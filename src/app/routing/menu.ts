import { Menu } from "../models/menu";
import { CategoriesComponent } from "../modules/board/components/categories/categories.component";
import { map, of } from "rxjs";
import { CategoryResolver } from "./category-resolver";
import { CurrentCategoryService } from "../services/current-category.service";
import { GoalsComponent } from "../modules/board/components/goals/goals.component";

export const MENU: Menu[] = [
  {
    name: 'Категории',
    path: 'categories',
    component: CategoriesComponent,
    resolve: {
      category: CategoryResolver,
    }
  },
  {
    path: 'categories/:categoryId/goals',
    component: GoalsComponent,
    getName: (injector) => {
      return injector.get(CurrentCategoryService).category$.pipe(
        map(category => category ? `<i></i> ${category.title}` : null)
      );
    },
    getPath: (injector) => {
      return injector.get(CurrentCategoryService).category$.pipe(
        map(category => category ? `categories/${category.id}/goals` : null)
      );
    },
    resolve: {
      category: CategoryResolver,
    }
  },
  {
    path: 'categories/goals',
    component: GoalsComponent,
    name: 'Все цели',
    resolve: {
      category: CategoryResolver,
    }
  },
];
