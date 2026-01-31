import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradeListComponent } from './trades/trade-list.component';
import { TradeNewComponent } from './trades/trade-new.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'trades', pathMatch: 'full' },
  { path: 'trades', component: TradeListComponent },
  { path: 'trades/new', component: TradeNewComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
