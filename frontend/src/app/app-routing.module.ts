import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainTabsComponent } from './user/main-tabs/main-tabs.component';
import { authGuardGuard } from './guard/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: MainTabsComponent,
    canMatch: [authGuardGuard],
    children: [
      {
        path: '',
        redirectTo: 'beranda',
        pathMatch: 'full'
      },
      {
        path: 'beranda',
        loadChildren: () => import('./user/beranda/beranda.module').then(m => m.BerandaPageModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./user/order/order.module').then(m => m.OrderPageModule)
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
