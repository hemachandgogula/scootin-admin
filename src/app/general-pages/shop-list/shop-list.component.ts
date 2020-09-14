import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {

  shopList
  page=1

  constructor(private shopService: ShopService) { }

  ngOnInit() {
    this.shopService.getAllShop().subscribe(res => {
      this.shopList = res;
    })
  }

}
