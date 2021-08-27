import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepagePage } from './homepage.page';

const routes: Routes = [
  {
    path: '',
    component: HomepagePage
  },
  {
    path: 'job-history',
    loadChildren: () => import('./profile/job-history/job-history.module').then( m => m.JobHistoryPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./profile/privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'terms-condition',
    loadChildren: () => import('./profile/terms-condition/terms-condition.module').then( m => m.TermsConditionPageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news/news.module').then( m => m.NewsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepagePageRoutingModule {}
