import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainTabsComponent } from './user/main-tabs/main-tabs.component';
import { authGuardGuard } from './guard/auth-guard.guard';
import { MenuComponent } from './admin/menu/menu.component';
import { unauthGuard } from './guard/unauth.guard';
import { gateGuard } from './guard/gate.guard';

const routes: Routes = [
  {
    path: 'login',
    canMatch: [unauthGuard],
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    canActivate: [gateGuard],
    loadComponent: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
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
        path: 'category/:id',
        loadChildren: () => import('./user/category/category.module').then(m => m.CategoryPageModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./user/order/order.module').then(m => m.OrderPageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./user/cart/cart.module').then(m => m.CartPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./user/account/account.module').then(m => m.AccountPageModule)
      },
    ]
  },
  {
    path: 'admin',
    component: MenuComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./admin/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./admin/products/products.module').then(m => m.ProductsPageModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./admin/categories/categories.module').then(m => m.CategoriesPageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./admin/orders/orders.module').then(m => m.OrdersPageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./admin/users/users.module').then(m => m.UsersPageModule)
      },
      {
        path: 'subcategory',
        loadChildren: () => import('./admin/sub-category/sub-category.module').then(m => m.SubCategoryPageModule)
      },
    ]
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
