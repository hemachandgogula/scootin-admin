import { Component, OnInit } from '@angular/core';
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

  constructor(private shopService: ShopService, private utility: UtilityService, private confirmDialogService: ConfirmDialogService) { }

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

}
