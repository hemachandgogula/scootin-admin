import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';
import { Dropdown } from 'src/app/models/dropdown';
import { ServiceAreaService } from 'src/app/services/service-area.service';
import { ServiceArea } from 'src/app/models/service-area';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserRole } from 'src/app/enums/user-role.enum';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {

  shopList
  page = 1
  pageSize = 10;
  serviceAreaList: Dropdown[] = [];
  editShop;

  constructor(private shopService: ShopService, private authService: AuthenticationService, private serviceAreaService: ServiceAreaService, private utility: UtilityService, private confirmDialogService: ConfirmDialogService, private router: Router) { }

  ngOnInit() {
    this.serviceAreaService.getAllServiceArea().subscribe((res: ServiceArea[]) => {
      this.serviceAreaList = this.utility.generateDropDownList('id', 'name', res);
      if (this.authService.loggedUserRole == UserRole.ROLE_SUPER_ADMIN) {
        this.getShops();
      } else {
        this.getShops();
      }
    })
  }

  deleteShop(id: number) {
    this.confirmDialogService.confirmThis("Are you sure to delete?", () => {
      this.shopService.deleteShop(id).subscribe(res => {
        this.utility.showSuccess("Successfully Deleted");
        this.getShops();
      });
    }, () => {
    })

  }
  getShops() {
    this.shopService.getAllShop().subscribe(res => {
      this.shopList = res;
    })
  }
  getShopFilter(id: number) {
    this.shopService.getAllShopFilter(id).subscribe(res => {
      this.shopList = res;
    })
  }
  toggleShop(event, shopId: number) {
    this.shopService.toggleShop(event.target.checked, shopId).subscribe(res => {
      event.target.checked ? this.utility.showSuccess("Successfully Enabled") : this.utility.showSuccess("Successfully Disabled")
    })
  }
  addItem(shopId: number) {
    this.router.navigate(['general-pages/add-item', { id: shopId }])
  }

  viewItems(shopId: number) {
    this.router.navigate(['general-pages/item-list', { id: shopId }])
  }

}
