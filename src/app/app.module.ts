import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './routing/routes';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RightSidePanelComponent } from './components/right-side-panel/right-side-panel.component';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './components/profile/profile.component';
import { CookieService } from 'ngx-cookie-service';
import { CsrfInterceptor } from './interseptor/csrf-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    FormFieldComponent,
    HeaderComponent,
    LayoutComponent,
    LoginComponent,
    MenuComponent,
    SignUpComponent,
    RightSidePanelComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTabsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    MatIconModule,
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CsrfInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
