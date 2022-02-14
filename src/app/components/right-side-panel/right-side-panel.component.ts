import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getInitials } from 'src/app/helpers/get-initials';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-right-side-panel',
  templateUrl: './right-side-panel.component.html',
  styleUrls: ['./right-side-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightSidePanelComponent {
  user$ = this.userService.user$;
  getInitials = getInitials;

  constructor(
    private userService: UserService,
  ) {
  }

  logout(): void {
    this.userService.logout();
  }
}
