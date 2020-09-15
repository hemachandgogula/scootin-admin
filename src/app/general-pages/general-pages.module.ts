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
import { ItemListComponent } from './item-list/item-list.component';
import { AddItemComponent } from './add-item/add-item.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { RoleListComponent } from './role-list/role-list.component';
import { AddServiceAreaComponent } from './add-service-area/add-service-area.component';
import { ServiceAreaListComponent } from './service-area-list/service-area-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { SharedModule } from '../shared/shared.module';
import { AgmCoreModule } from '@agm/core';

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
  { path: 'rider-list', component: RiderListComponent, canActivate: [AuthGuard] },
  { path: 'add-item', component: AddItemComponent, canActivate: [AuthGuard] },
  { path: 'item-list', component: ItemListComponent, canActivate: [AuthGuard] },
  { path: 'payment-history', component: PaymentHistoryComponent, canActivate: [AuthGuard] },
  { path: 'add-role', component: AddRoleComponent, canActivate: [AuthGuard] },
  { path: 'role-list', component: RoleListComponent, canActivate: [AuthGuard] },
  { path: 'add-service-area', component: AddServiceAreaComponent, canActivate: [AuthGuard] },
  { path: 'service-area-list', component: ServiceAreaListComponent, canActivate: [AuthGuard] },
  { path: 'add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'order-list', component: OrderListComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [BlankPageComponent,
    AddShopComponent,
    ShopListComponent,
    UserListComponent,
    DeliverypeopleListComponent,
    AddDeliverypeopleComponent,
    AddPromocodesComponent,
    PromocodeListComponent,
    CategoriesListComponent,
    AddCategoriesComponent,
    AddUserComponent,
    UploadShopComponent,
    AddRiderComponent,
    RiderListComponent,
    ItemListComponent,
    AddItemComponent,
    PaymentHistoryComponent,
    AddRoleComponent,
    RoleListComponent,
    AddServiceAreaComponent,
    ServiceAreaListComponent,
    AddEmployeeComponent,
    EmployeeListComponent,
    OrderListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBV57UA9d4G4J1Z2XnZFiGykdv0ZLcaAuI'
    }),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ]
})
export class GeneralPagesModule { }
