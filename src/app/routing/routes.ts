import { LayoutComponent } from '../components/layout/layout.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthPageComponent } from '../components/auth-page/auth-page.component';
import { LoginComponent } from '../components/login/login.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';

export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
  },
  {
    path: 'auth',
    component: AuthPageComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        data: { name: 'auth' },
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        data: { name: 'signUp' },
      }
    ]
  }
];
