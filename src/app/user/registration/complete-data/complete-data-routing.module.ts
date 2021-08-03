import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteDataPage } from './complete-data.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteDataPageRoutingModule {}
