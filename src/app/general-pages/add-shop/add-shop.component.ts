import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { UtilityService } from 'src/app/services/utility.service';
import { Media } from 'src/app/models/media';
import { ShopService } from 'src/app/services/shop.service';
import { Dropdown } from 'src/app/models/dropdown';
import { ServiceAreaService } from 'src/app/services/service-area.service';
import { ServiceArea } from 'src/app/models/service-area';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.scss']
})
export class AddShopComponent implements OnInit, AfterViewInit {

  lat = 0;
  lng = 0;

  addShopForm: FormGroup;
  categoryList: Dropdown[] = [];
  serviceAreaList: Dropdown[] = [];
  selectedGSTFile: string = '';
  selectedPANFile: string = '';
  selectedBannerFile: string = '';

  openTime: Dropdown[] = [
    { key: '10:00', value: '10:00' },
    { key: '10:30', value: '10:30' },
    { key: '11:00', value: '11:00' },
    { key: '11:30', value: '11:30' },
    { key: '12:30', value: '12:30' },
    { key: '12:30', value: '12:30' },
    { key: '13:30', value: '13:30' },
    { key: '13:30', value: '13:30' },
    { key: '14:30', value: '14:30' },
    { key: '14:30', value: '14:30' },
    { key: '15:30', value: '15:30' },
    { key: '15:30', value: '15:30' },
    { key: '16:30', value: '16:30' },
    { key: '16:30', value: '16:30' }
  ]
  stateList: Dropdown[] = [];
  closeTime: Dropdown[] = [
    { key: '10:00', value: '10:00' },
    { key: '10:30', value: '10:30' },
    { key: '11:00', value: '11:00' },
    { key: '11:30', value: '11:30' },
    { key: '12:30', value: '12:30' },
    { key: '12:30', value: '12:30' },
    { key: '13:30', value: '13:30' },
    { key: '13:30', value: '13:30' },
    { key: '14:30', value: '14:30' },
    { key: '14:30', value: '14:30' },
    { key: '15:30', value: '15:30' },
    { key: '15:30', value: '15:30' },
    { key: '16:30', value: '16:30' },
    { key: '16:30', value: '16:30' }
  ]
  constructor(private _fb: FormBuilder, private serviceAreaService: ServiceAreaService, private categoryService: CategoryService, private utility: UtilityService, private shopService: ShopService) { }

  ngOnInit() {
    this.categoryService.getAllCategory().subscribe((res: Category[]) => {
      this.categoryList = this.utility.generateDropDownList('id', 'name', res);
    });
    this.serviceAreaService.getAllServiceArea().subscribe((res: ServiceArea[]) => {
      this.serviceAreaList = this.utility.generateDropDownList('id', 'name', res);
    })
    this.utility.getAllState().subscribe((res: any[]) => {
      this.stateList = this.utility.generateDropDownList('id', 'name', res);
    })
    this.addShopForm = this._fb.group({
      name: [''],
      open_time: [''],
      close_time: [''],
      latitude: [''],
      longitude: [''],
      category_id: [''],
      shop_banner_media_id: [''],
      shop_land_line: [''],
      discount_amount: [''],
      discount_type: [''],
      service_area_id: [''],
      owner: this._fb.group({
        last_name: [''],
        first_name: [''],
        password: [''],
        pan_id: [''],
        pan_card: [''],
        gst_info_id: [''],
        gst_info: ['']
      }),
      address: this._fb.group({
        addressType:['SHOP'],
        address_line_1: [''],
        address_line_2: [''],
        city: [''],
        pincode: [''],
        state_id: ['']
      })
    })
  }
  ngAfterViewInit() {
  }

  uploadImage(file, type) {
    this.utility.uploadImage(file.item(0)).subscribe((res: Media) => {
      switch (type) {
        case 'banner':
          this.selectedBannerFile = file.item(0).name;
          this.addShopForm.patchValue({
            shop_banner_media_id: res.id
          });
          break;
        case 'gst':
          this.selectedGSTFile = file.item(0).name;
          this.addShopForm.get('owner').patchValue({
            gst_info_id: res.id
          });
          break;
        case 'pan':
          this.selectedPANFile = file.item(0).name;
          this.addShopForm.get('owner').patchValue({
            pan_id: res.id
          });
          break;
      }

    })
  }
  addShop() {
    this.shopService.addShop(this.addShopForm.value).subscribe(res => {
      if (res.status) {
        this.addShopForm.reset();
        this.utility.showSuccess("Successfully added")
      } else {
        this.utility.showError("Failed to add shop");
      }
    });
  }
  selectMarker(event) {
    this.lat = parseFloat(event.coords.lat);
    this.lng = parseInt(event.coords.lng);
    this.addShopForm.patchValue({
      latitude: event.coords.lat,
      longitude: event.coords.lng
    })
  }
}
