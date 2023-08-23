import { Menu, MenuView } from "../models/menu";
import { CategoriesComponent } from "../modules/board/components/categories/categories.component";
import { combineLatest, map, of } from "rxjs";
import { CategoryResolver } from "./category-resolver";
import { CurrentCategoryService } from "../services/current-category.service";
import { GoalsComponent } from "../modules/board/components/goals/goals.component";
import { BoardsComponent } from "../modules/board/components/boards/boards.component";
import { BoardResolver } from "./board-resolver";
import { CurrentBoardService } from "../services/current-board.service";

export const MENU: MenuView[] = [
  {
    name: 'Boards',
    path: 'boards',
    component: BoardsComponent,
    resolve: {
      category: CategoryResolver,
      board: BoardResolver,
    }
  },
  {
    path: 'boards/:boardId/categories',
    component: CategoriesComponent,
    getName: (injector) => {
      return injector.get(CurrentBoardService).board$.pipe(
        map(item => item ? `<i></i> ${item.title} / Categories` : null)
      );
    },
    getPath: (injector) => {
      return injector.get(CurrentBoardService).board$.pipe(
        map(item => item ? `boards/${item.id}/categories` : null)
      );
    },
    resolve: {
      category: CategoryResolver,
      board: BoardResolver,
    }
  },
  {
    path: 'boards/:boardId/categories/:categoryId/goals',
    component: GoalsComponent,
    getName: (injector) => {
      return combineLatest([
        injector.get(CurrentCategoryService).category$,
        injector.get(CurrentBoardService).board$
      ]).pipe(
        map(([category, board]) => (category && board) ? `<i></i><i></i> ${board.title} / ${category.title} / Goals` : null)
      );
    },
    getPath: (injector) => {
      return combineLatest([
        injector.get(CurrentCategoryService).category$,
        injector.get(CurrentBoardService).board$
      ]).pipe(
        map(([category, board]) => (category && board) ? `boards/${board.id}/categories/${category.id}/goals` : null)
      );
    },
    resolve: {
      category: CategoryResolver,
      board: BoardResolver,
    }
  },
  {
    path: 'boards/:boardId/goals',
    component: GoalsComponent,
    getName: (injector) => {
      return injector.get(CurrentBoardService).board$.pipe(
        map(item => item ? `<i></i> ${item.title} / Goals` : null)
      );
    },
    getPath: (injector) => {
      return injector.get(CurrentBoardService).board$.pipe(
        map(item => item ? `boards/${item.id}/goals` : null)
      );
    },
    resolve: {
      board: BoardResolver,
      category: CategoryResolver,
    }
  },
  {
    isSeparator: true,
  },
  {
    name: 'All categories',
    path: 'categories',
    component: CategoriesComponent,
    resolve: {
      category: CategoryResolver,
      board: BoardResolver,
    }
  },
  {
    path: 'categories/goals',
    component: GoalsComponent,
    name: 'All goals',
    resolve: {
      category: CategoryResolver,
      board: BoardResolver,
    }
  },
];
