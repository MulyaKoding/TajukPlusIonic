import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeBankAccountPage } from './change-bank-account.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeBankAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeBankAccountPageRoutingModule {}
