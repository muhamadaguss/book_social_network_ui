import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { BorrowedRoutingModule } from './borrowed-routing.module';
import { BorrowedListComponent } from './borrowed-list/borrowed-list.component';
import { DataTableModule } from '@bhplugin/ng-datatable';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TablerIconsModule } from 'angular-tabler-icons';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ImageComponent } from 'src/app/components/image/image.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [BorrowedListComponent],
  imports: [
    CommonModule,
    BorrowedRoutingModule,
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
export class BorrowedModule {}
