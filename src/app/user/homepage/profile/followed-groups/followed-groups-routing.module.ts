import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FollowedGroupsPage } from './followed-groups.page';

const routes: Routes = [
  {
    path: '',
    component: FollowedGroupsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FollowedGroupsPageRoutingModule {}
