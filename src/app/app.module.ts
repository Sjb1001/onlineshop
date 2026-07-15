import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './product/product.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { CartModule } from './cart/cart.module';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './customer/checkout/checkout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule } from '@angular/forms';
import { SellerDashboardComponent } from './seller/seller-dashboard/seller-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CategoryComponent } from './admin/category/category.component';
import { CreateStoreComponent } from './seller/create-store/create-store.component';
import { StoreManagementComponent } from './admin/store-management/store-management.component';
import { ManageStoreCategoryComponent } from './admin/manage-store-category/manage-store-category.component';
import { SellerManagementComponent } from './admin/seller-management/seller-management.component';
import { AddProductComponent } from './seller/add-product/add-product.component';
import { MyProductsComponent } from './seller/my-products/my-products.component';
import { EditProductComponent } from './seller/edit-product/edit-product.component';
import { RouterModule } from '@angular/router';
import { ReviewComponent } from './customer/review/review.component';
import { ChatComponent } from './customer/chat/chat.component';
import { SellerInboxComponent } from './seller/seller-inbox/seller-inbox.component';
import { SellerChatComponent } from './seller/seller-chat/seller-chat.component';
import { CustomerInboxComponent } from './customer/customer-inbox/customer-inbox.component';
import { CourierDashboardComponent } from './courier/courier-dashboard/courier-dashboard.component';
import { DeliveryMapComponent } from './shared/delivery-map/delivery-map.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
// NgRx Core Imports
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// NgRx Authentication State Imports
import { authReducer } from './state/auth.reducer';
import { AuthEffects } from './state/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    SellerDashboardComponent,
    AdminDashboardComponent,
    CategoryComponent,
    CreateStoreComponent,
    StoreManagementComponent,
    ManageStoreCategoryComponent,
    SellerManagementComponent,
    AddProductComponent,
    MyProductsComponent,
    EditProductComponent,
    ForgotPasswordComponent,



  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ProductModule,
    HttpClientModule,
    CartModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    ReviewComponent,
    ChatComponent,
    SellerInboxComponent,
    SellerChatComponent,
    CustomerInboxComponent,
    CourierDashboardComponent,
    DeliveryMapComponent,

    StoreModule.forRoot({ auth: authReducer }),
    EffectsModule.forRoot([AuthEffects]),

    StoreDevtoolsModule.instrument({ maxAge: 25})
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
