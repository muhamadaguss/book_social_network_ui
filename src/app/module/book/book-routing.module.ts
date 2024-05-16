import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { authGuard } from 'src/app/services/guard/auth.guard';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';

const routes: Routes = [
  {
    path: '',
    component: BookListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'book-detail/:id',
    component: BookDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'book-edit/:id',
    component: BookEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}
