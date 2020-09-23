import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dropdown } from 'src/app/models/dropdown';
import { Item } from 'src/app/models/item';
import { ServiceArea } from 'src/app/models/service-area';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ItemService } from 'src/app/services/item.service';
import { ServiceAreaService } from 'src/app/services/service-area.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  page = 1;
  pageSize = 10;
  itemList: Item[] = [];
  selectedShopId: number;
  serviceAreaList: Dropdown[] = [];
  constructor(private itemService: ItemService, private route: ActivatedRoute, private utility: UtilityService, private auth: AuthenticationService, private serviceAreaService: ServiceAreaService) { }

  ngOnInit() {
    this.serviceAreaService.getAllServiceArea().subscribe((res: ServiceArea[]) => {
      this.serviceAreaList = this.utility.generateDropDownList('id', 'name', res);
    });

    this.route.params.subscribe(params => {
      this.selectedShopId = params.id;
    })
    this.getItemList();
  }
  // deleteItem(id) {
  //   this.itemService.deleteItem(id).subscribe(res => {
  //     this.utility.showSuccess("Successfully Deleted");
  //     this.getItemList();
  //   });
  // }
  getAllItemByServiceId(serviceId: number) {
    this.itemService.getAllItem(serviceId).subscribe((res: Item[]) => {
      this.itemList = res;
    })
  }
  getItemList() {
    if (this.selectedShopId)
      this.itemService.getAllItemByShop(this.selectedShopId).subscribe((res: Item[]) => {
        this.itemList = res;
      })
    else
      this.itemService.getAllItem(this.auth.loggedUserServiceArea).subscribe((res: Item[]) => {
        this.itemList = res;
      })
  }

}
