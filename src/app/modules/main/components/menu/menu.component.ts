import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MENU } from "../../../../routing/menu";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
  menu = MENU;

  constructor() {
  }

  ngOnInit(): void {
  }

}
