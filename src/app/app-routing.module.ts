import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/authGuard/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./user/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./user/registration/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'complete-data',
    loadChildren: () => import('./user/registration/complete-data/complete-data.module').then( m => m.CompleteDataPageModule)
  },
  {
    path: 'news-detail',
    loadChildren: () => import('./user/homepage/news/news-detail/news-detail.module').then( m => m.NewsDetailPageModule)
  },
  {
    path: 'bookmarks',
    loadChildren: () => import('./user/homepage/profile/bookmarks/bookmarks.module').then( m => m.BookmarksPageModule)
  },
  {
    path: 'followed-groups',
    loadChildren: () => import('./user/homepage/profile/followed-groups/followed-groups.module').then( m => m.FollowedGroupsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./user/homepage/profile/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'change-bank-account',
    loadChildren: () => import('./user/homepage/profile/change-bank-account/change-bank-account.module').then( m => m.ChangeBankAccountPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./user/homepage/profile/support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./user/homepage/profile/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./user/homepage/news/news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'job-history',
    loadChildren: () => import('./user/homepage/profile/job-history/job-history.module').then( m => m.JobHistoryPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./user/homepage/profile/privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./user/homepage/profile/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'terms-condition',
    loadChildren: () => import('./user/homepage/profile/terms-condition/terms-condition.module').then( m => m.TermsConditionPageModule)
  },
  {
    path: 'news-search',
    loadChildren: () => import('./user/homepage/news/news-search/news-search.module').then( m => m.NewsSearchPageModule)
  },
  {
    path: 'homepage',
    loadChildren: () => import('./user/homepage/homepage.module').then( m => m.HomepagePageModule),
    canActivate: [AuthGuardService]
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
