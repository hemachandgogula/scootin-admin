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
import { UploadShopComponent } from './upload-shop/upload-shop.component';
import { AddRiderComponent } from './add-rider/add-rider.component';
import { RiderListComponent } from './rider-list/rider-list.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'blank-page', component: BlankPageComponent, canActivate: [AuthGuard] },
  { path: 'add-shop', component: AddShopComponent, canActivate: [AuthGuard] },
  { path: 'add-categories', component: AddCategoriesComponent, canActivate: [AuthGuard] },
  { path: 'add-deliverypeople', component: AddDeliverypeopleComponent, canActivate: [AuthGuard] },
  { path: 'add-promocode', component: AddPromocodesComponent, canActivate: [AuthGuard] },
  { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'shop-list', component: ShopListComponent, canActivate: [AuthGuard] },
  { path: 'categories-list', component: CategoriesListComponent, canActivate: [AuthGuard] },
  { path: 'deliverypeople-list', component: DeliverypeopleListComponent, canActivate: [AuthGuard] },
  { path: 'promocode-list', component: PromocodeListComponent, canActivate: [AuthGuard] },
  { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'upload-shop', component: UploadShopComponent, canActivate: [AuthGuard] },
  { path: 'add-rider', component: AddRiderComponent, canActivate: [AuthGuard] },
  { path: 'rider-list', component: RiderListComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [BlankPageComponent, AddShopComponent, ShopListComponent, UserListComponent, DeliverypeopleListComponent, AddDeliverypeopleComponent, AddPromocodesComponent, PromocodeListComponent, CategoriesListComponent, AddCategoriesComponent, AddUserComponent, UploadShopComponent, AddRiderComponent, RiderListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class GeneralPagesModule { }
