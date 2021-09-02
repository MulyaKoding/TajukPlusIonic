import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsSearchPage } from './news-search.page';

const routes: Routes = [
  {
    path: '',
    component: NewsSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsSearchPageRoutingModule {}
