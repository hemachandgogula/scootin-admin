import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddShopComponent } from './add-shop/add-shop.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { DeliverypeopleListComponent } from './deliverypeople-list/deliverypeople-list.component';
import { AddDeliverypeopleComponent } from './add-deliverypeople/add-deliverypeople.component';
import { AddPromocodesComponent } from './add-promocodes/add-promocodes.component';
import { PromocodeListComponent } from './promocode-list/promocode-list.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  { path: 'blank-page', component: BlankPageComponent },
  { path: 'add-shop', component: AddShopComponent },
  { path: 'add-categories', component: AddCategoriesComponent },
  { path: 'add-deliverypeople', component: AddDeliverypeopleComponent },
  { path: 'add-promocode', component: AddPromocodesComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'shop-list', component: ShopListComponent },
  { path: 'categories-list', component: CategoriesListComponent },
  { path: 'deliverypeople-list', component: DeliverypeopleListComponent },
  { path: 'promocode-list', component: PromocodeListComponent },
  { path: 'user-list', component: UserListComponent },
]

@NgModule({
  declarations: [BlankPageComponent, AddShopComponent, ShopListComponent, UserListComponent, DeliverypeopleListComponent, AddDeliverypeopleComponent, AddPromocodesComponent, PromocodeListComponent, CategoriesListComponent, AddCategoriesComponent, AddUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule
  ]
})
export class GeneralPagesModule { }
