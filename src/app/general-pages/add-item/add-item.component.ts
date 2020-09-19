import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dropdown } from 'src/app/models/dropdown';
import { Media } from 'src/app/models/media';
import { ItemService } from 'src/app/services/item.service';
import { ShopService } from 'src/app/services/shop.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  addItemForm: FormGroup;
  shopList: Dropdown[] = [];
  selectedFile: string;
  constructor(private _fb: FormBuilder, private shopService: ShopService, private utility: UtilityService, private itemService: ItemService) { }

  ngOnInit() {
    this.shopService.getAllShop().subscribe((res: any[]) => {
      this.shopList = this.utility.generateDropDownList('id', 'name', res);
    })
    this.addItemForm = this._fb.group({
      description: [''],
      price: [''],
      productImageID: ['1'],
      quantity: [''],
      shopManagementId: [''],
      title: ['']
    })
  }

  uploadImage(file) {
    this.utility.uploadImage(file.item(0)).subscribe((res: Media) => {
      this.selectedFile = file.item(0).name;
      this.addItemForm.patchValue({
        productImageID: res.id
      });
    })
  }
  addItem() {
    if (this.addItemForm.valid) {
      this.itemService.addItem(this.addItemForm.value).subscribe(res => {
       if(res){
         this.addItemForm.reset();
         this.utility.showSuccess("Successfully Added");
       }
      })
    }
  }
}
