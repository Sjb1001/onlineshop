import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SellerDashboardComponent } from './seller/seller-dashboard/seller-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CategoryComponent } from './admin/category/category.component';
import { CreateStoreComponent } from './seller/create-store/create-store.component';
import { StoreManagementComponent } from './admin/store-management/store-management.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartListComponent },
  { path: 'checkout', component: CheckoutComponent },
    // Seller
  { path: 'seller', component: SellerDashboardComponent },
  // Admin
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'admin/stores', component: StoreManagementComponent },
  // Auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin/category', component: CategoryComponent },
  {path: 'seller/create-store',component: CreateStoreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
