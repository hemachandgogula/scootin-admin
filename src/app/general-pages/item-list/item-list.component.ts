import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  page = 1;
  itemList: Item[] = [];
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItemList();
  }
  // deleteItem(id) {
  //   this.itemService.deleteItem(id).subscribe(res => {
  //     this.utility.showSuccess("Successfully Deleted");
  //     this.getItemList();
  //   });
  // }

  getItemList() {
    this.itemService.getAllItem(4552).subscribe((res: Item[]) => {
      this.itemList = res;
    })
  }

}
