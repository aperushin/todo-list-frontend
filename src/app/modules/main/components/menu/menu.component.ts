import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { MENU } from "../../../../routing/menu";
import { DynamicMenu, Menu, StaticMenu } from "../../../../models/menu";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  menu = MENU;

  isStatic(item: Menu): item is StaticMenu {
    return !!(item as StaticMenu).name;
  }

  isDynamic(item: Menu): item is DynamicMenu {
    return !!(item as DynamicMenu).getName;
  }

  constructor(
    public injector: Injector,
  ) {
  }

  prepareName(name: string): string {
    return name.replace('<sub>', '<i class="material-icons">subdirectory_arrow_right</i>')
  }

}
