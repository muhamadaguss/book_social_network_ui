import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { CodeInputModule } from 'angular-code-input';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { BrandingComponent } from './layouts/full/sidebar/branding.component';
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpTokenInterceptor } from './services/interceptor/http-token.interceptor';
import { NgOptimizedImage } from '@angular/common';
import { DataTableModule } from '@bhplugin/ng-datatable';
import { BookModule } from './module/book/book.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ImageComponent } from './components/image/image.component';
import { BorrowedModule } from './module/borrowed/borrowed.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    BlankComponent,
    FullComponent,
    HeaderComponent,
    BrandingComponent,
    SidebarComponent,
    AppNavItemComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    CodeInputModule,
    NgApexchartsModule,
    BookModule,
    BorrowedModule,
    TablerIconsModule.pick(TablerIcons),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    SweetAlert2Module,
    SweetAlert2Module.forRoot(),
    NgOptimizedImage,
  ],
  exports: [TablerIconsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
