import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';

import { HomeComponent } from './component/home/home.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ProductComponent } from './component/product/product.component';
import { UserComponent } from './component/user/user.component';
import { ViewComponent } from './component/view/view.component';



const routes: Routes = [
  {
    path:'',redirectTo:'home',pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent

  },
  {
    path:'product', component:ProductComponent
  },
  {
    path:'view/:id',component:ViewComponent
  },
  {
    path:'cart',component:CartComponent
  },
 {
  path:'user',component:UserComponent
 },
 {
  path:'**',component:NotFoundComponent
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
