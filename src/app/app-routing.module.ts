import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
