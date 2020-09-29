import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selectedShopId: number;
  imagePath: any;
  imgURL: any;
  constructor(private _fb: FormBuilder, private router: Router, private shopService: ShopService, private utility: UtilityService, private itemService: ItemService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.addItemForm = this._fb.group({
      description: [''],
      price: [''],
      productImageID: [],
      quantity: [''],
      shopManagementId: [''],
      title: ['']
    })
    this.route.params.subscribe(params => {
      this.selectedShopId = params.id;
      if (this.selectedShopId) {
        this.addItemForm.patchValue({
          shopManagementId: this.selectedShopId
        })
      }
    })
    this.shopService.getAllShop().subscribe((res: any[]) => {
      this.shopList = this.utility.generateDropDownList('id', 'name', res);
    })

  }

  uploadImage(file) {
    this.utility.uploadImage(file.item(0)).subscribe((res: Media) => {
      this.selectedFile = file.item(0).name;
      var mimeType = file[0].type;
      if (mimeType.match(/image\/*/) == null) {
        alert("Only images are supported.");
        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
      this.addItemForm.patchValue({
        productImageID: res.id
      });
    })
  }
  addItem() {
    if (this.addItemForm.valid) {
      this.itemService.addItem(this.addItemForm.value).subscribe(res => {
        if (res) {
          // this.addItemForm.reset();
          this.imgURL = undefined;
          this.imagePath = undefined;
          this.utility.showSuccess("Successfully Added");
          this.router.navigate(['/general-pages/item-list']);
        }
      })
    }
  }
  deleteImage() {
    this.utility.deleteImage(this.addItemForm.get('productImageID').value).subscribe(
      (res: any) => {
        this.imgURL = undefined;
        this.imagePath = undefined;
        this.addItemForm.patchValue({
          productImageID: null
        })
        this.utility.showSuccess("Image deleted Successfully");
      },
      (error: any) => {
        this.utility.showError("Error in deleting image");
      }
    )
  }
}
