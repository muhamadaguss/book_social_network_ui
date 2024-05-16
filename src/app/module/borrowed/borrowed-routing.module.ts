import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BorrowedListComponent } from './borrowed-list/borrowed-list.component';
import { authGuard } from 'src/app/services/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BorrowedListComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BorrowedRoutingModule {}
