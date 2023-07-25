import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { LogoutComponent } from './component/logout/logout.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './component/register/register.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { PaymentModuleComponent } from './component/payment-module/payment-module.component';
import { ItemComponent } from './component/item/item.component';
import { RestaurantsComponent } from './component/restaurants/restaurants.component';
import { RestaurantSignupComponent } from './component/restaurant-signup/restaurant-signup.component';
import { AddRestaurantComponent } from './component/add-restaurant/add-restaurant.component';
import { RestaurantRegistrationComponent } from './component/restaurant-registration/restaurant-registration.component';
import { CustomerDataComponent } from './component/customer-data/customer-data.component';
import { CustomerDataEditComponent } from './component/customer-data-edit/customer-data-edit.component';
import { RegistereditemComponent } from './component/registereditem/registereditem.component';
import { UpdateItemComponent } from './component/update-item/update-item.component';

import { RestaurantDataComponent } from './component/restaurant-data/restaurant-data.component';
import { RestaurantdataEditComponent } from './component/restaurantdata-edit/restaurantdata-edit.component';
import { MenuComponent } from './component/menu/menu.component';
import { HomeComponent } from './component/home/home.component';
import { CartComponent } from './component/cart/cart.component';


const routes: Routes = [
  // {path:'',component:RestaurantLoginComponent},//this is a default path
  {path:'',component:HomeComponent},
   {path:'logoutadmin',component:MenuComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'invoice',component:InvoiceComponent},
  {path:'paymentModule',component:PaymentModuleComponent},
  {path:'restaurant',component:RestaurantsComponent},
  {path:'item/:id',component:ItemComponent},
  {path:'logout',component:HomeComponent},
  {path:'RestaurantSignup',component:RestaurantSignupComponent},
  {path:'AddRestaurant',component:AddRestaurantComponent},
  {path: 'RegisterRestaurant', component:RestaurantRegistrationComponent},
  {path:'customeradmin',component:CustomerDataComponent},
  {path:'customerEdit/:id',component:CustomerDataEditComponent},
  {path:'registerItem/:id',component:RegistereditemComponent},
  {path:'updateItem/:id/:rid',component:UpdateItemComponent},
  {path:'restaurantEdit/:id',component:RestaurantdataEditComponent},
  {path: 'restaurantadmin',component:RestaurantDataComponent},
  {path:'customeradmin',component:CustomerDataComponent},
  {path:'cart',component:CartComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
