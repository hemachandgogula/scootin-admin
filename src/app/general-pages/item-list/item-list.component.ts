import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  page = 1;
  itemList: any[] = [];
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getAllItem(4552).subscribe(res => {
      this.itemList = res;
    })
  }

}
