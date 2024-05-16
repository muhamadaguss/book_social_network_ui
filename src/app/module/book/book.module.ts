import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { BookRoutingModule } from './book-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ImageComponent } from 'src/app/components/image/image.component';
import { DataTableModule } from '@bhplugin/ng-datatable';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [BookListComponent, BookDetailComponent, BookEditComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    DataTableModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    TablerIconsModule.pick(TablerIcons),
    SweetAlert2Module,
    SweetAlert2Module.forRoot(),
    ComponentsModule,
  ],
})
export class BookModule {}
