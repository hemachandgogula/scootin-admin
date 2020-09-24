import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {

  shopList
  page = 1
  pageSize = 10;

  editShop;

  constructor(private shopService: ShopService, private utility: UtilityService, private confirmDialogService: ConfirmDialogService, private router: Router) { }

  ngOnInit() {
    this.getShops();
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
