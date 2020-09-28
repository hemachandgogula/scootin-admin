import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { UtilityService } from 'src/app/services/utility.service';
import { Media } from 'src/app/models/media';
import { ShopService } from 'src/app/services/shop.service';
import { Dropdown } from 'src/app/models/dropdown';
import { ServiceAreaService } from 'src/app/services/service-area.service';
import { ServiceArea } from 'src/app/models/service-area';
import { AddShopRequest } from 'src/app/models/request/add-shop-request';
import { Shop } from 'src/app/models/shop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.scss']
})
export class AddShopComponent implements OnInit, AfterViewInit {

  lat = 28.207609;
  lng = 79.826660;
  disc_amt = 0;

  @Output() updated: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() edit: boolean = false;
  @Input() set editShop(editShop: Shop) {
    if (editShop) {
      this.editShopId = editShop.id;
      this.addShopForm.patchValue({
        name: editShop.name,
        open_time: editShop.openTime,
        close_time: editShop.closeTime,
        latitude: editShop.latitude,
        longitude: editShop.longitude,
        category_id: editShop.categoryDetails.id,
        shop_banner_media_id: editShop.shopBannerReference ? editShop.shopBannerReference.id : null,
        shop_land_line: editShop.shopOwner.mobile_number,
        discount_amount: editShop.amount,
        discount_type: editShop.discountType,
        service_area_id: editShop.serviceID.id,
        owner: {
          // last_name: editShop.shopOwner ? editShop.shopOwner.last_name : null,
          first_name: editShop.shopOwner ? editShop.shopOwner.first_name : null,
          password: editShop.shopOwner ? editShop.shopOwner.password : null,
          pan_id: editShop.shopOwner.panReference ? editShop.shopOwner.panReference.id : null,
          pan_card: editShop.shopOwner ? editShop.shopOwner.pan_card : null,
          gst_info_id: editShop.shopOwner.gstInfoReference ? editShop.shopOwner.gstInfoReference.id : null,
          gst_info: editShop.shopOwner.gst_info ? editShop.shopOwner.gst_info : null
        },
        address: {
          addressType: 'SHOP',
          address_line_1: editShop.address ? editShop.address.addressLine1 : null,
          address_line_2: editShop.address ? editShop.address.addressLine2 : null,
          city: editShop.address ? editShop.address.city : null,
          pincode: editShop.address ? editShop.address.pincode : null,
          state_id: editShop.address ? editShop.address.stateDetails.id : null
        }
      });
    }
  };

  editShopId: number;

  addShopForm: FormGroup;
  categoryList: Dropdown[] = [];
  serviceAreaList: Dropdown[] = [];
  selectedGSTFile: string = '';
  selectedPANFile: string = '';
  selectedBannerFile: string = '';
  gstImgURL: any;
  gstImgPath: any;
  panImgURL: any;
  panImgPath: any;
  bannerImgURL: any;
  bannerImgPath: any;
  openTime: Dropdown[] = [
    { key: '9:00', value: '9:00' },
    { key: '9:30', value: '9:30' },
    { key: '10:00', value: '10:00' },
    { key: '10:30', value: '10:30' },
    { key: '11:00', value: '11:00' },
    { key: '11:30', value: '11:30' },
    { key: '12:00', value: '12:00' },
    { key: '12:30', value: '12:30' },
    { key: '13:00', value: '13:00' },
    { key: '13:30', value: '13:30' },
    { key: '14:00', value: '14:00' },
    { key: '14:30', value: '14:30' },
    { key: '15:00', value: '15:00' },
    { key: '15:30', value: '15:30' },
    { key: '16:00', value: '16:00' },
    { key: '16:30', value: '16:30' },
    { key: '17:00', value: '17:00' },
    { key: '17:30', value: '17:30' },
    { key: '18:00', value: '18:00' },
    { key: '18:30', value: '18:30' },
    { key: '19:00', value: '19:00' },
    { key: '19:30', value: '19:30' },
    { key: '20:00', value: '20:00' },
    { key: '20:30', value: '20:30' },
    { key: '21:00', value: '21:00' },
    { key: '21:30', value: '21:30' },
    { key: '22:00', value: '22:00' },
    { key: '22:30', value: '22:30' },
    { key: '23:00', value: '23:00' },
    { key: '23:30', value: '23:30' }
  ]
  stateList: Dropdown[] = [];
  closeTime: Dropdown[] = [
    { key: '00:00', value: '00:00' },
    { key: '00:30', value: '00:30' },
    { key: '01:00', value: '01:00' },
    { key: '01:30', value: '01:30' },
    { key: '02:00', value: '02:00' },
    { key: '02:30', value: '02:30' },
    { key: '03:00', value: '03:00' },
    { key: '03:30', value: '03:30' },
    { key: '04:00', value: '04:00' },
    { key: '04:30', value: '04:30' },
    { key: '05:00', value: '05:00' },
    { key: '05:30', value: '05:30' },
    { key: '06:00', value: '06:00' },
    { key: '06:30', value: '06:30' },
    { key: '07:00', value: '07:00' },
    { key: '07:30', value: '07:30' },
    { key: '08:00', value: '08:00' },
    { key: '08:30', value: '08:30' },
    { key: '09:00', value: '09:00' },
    { key: '09:30', value: '09:30' },
    { key: '10:00', value: '10:00' },
    { key: '10:30', value: '10:30' },
    { key: '11:00', value: '11:00' },
    { key: '11:30', value: '11:30' },
    { key: '12:00', value: '12:00' },
    { key: '12:30', value: '12:30' },
    { key: '13:00', value: '13:00' },
    { key: '13:30', value: '13:30' },
    { key: '14:00', value: '14:00' },
    { key: '14:30', value: '14:30' },
    { key: '15:00', value: '15:00' },
    { key: '15:30', value: '15:30' },
    { key: '16:00', value: '16:00' },
    { key: '16:30', value: '16:30' },
    { key: '17:00', value: '17:00' },
    { key: '17:30', value: '17:30' },
    { key: '18:00', value: '18:00' },
    { key: '18:30', value: '18:30' },
    { key: '19:00', value: '19:00' },
    { key: '19:30', value: '19:30' },
    { key: '20:00', value: '20:00' },
    { key: '20:30', value: '20:30' },
    { key: '21:00', value: '21:00' },
    { key: '21:30', value: '21:30' },
    { key: '22:00', value: '22:00' },
    { key: '22:30', value: '22:30' },
    { key: '23:00', value: '23:00' },
    { key: '23:30', value: '23:30' }
  ];

  discountTypes: any = [
    { key: 'FIXED', value: 'Fixed' },
    { key: 'PERCENTAGE', value: 'Percentage' }
  ]
  constructor(private _fb: FormBuilder, private router: Router, private serviceAreaService: ServiceAreaService, private categoryService: CategoryService, private utility: UtilityService, private shopService: ShopService) { }

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
      name: [],
      open_time: [],
      close_time: [],
      latitude: [],
      longitude: [],
      category_id: [],
      shop_banner_media_id: [],
      shop_land_line: [],
      discount_amount: [],
      discount_type: [],
      service_area_id: [],
      owner: this._fb.group({
        // last_name: [],
        first_name: [],
        password: [],
        mobile_number: [],
        pan_id: [],
        pan_card: [],
        gst_info_id: [],
        gst_info: []
      }),
      address: this._fb.group({
        addressType: ['SHOP'],
        address_line_1: [],
        address_line_2: [],
        city: [],
        pincode: [],
        state_id: []
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
          var mimeType = file[0].type;
          if (mimeType.match(/image\/*/) == null) {
            alert("Only images are supported.");
            return;
          }
          var reader = new FileReader();
          this.bannerImgPath = file;
          reader.readAsDataURL(file[0]);
          reader.onload = (_event) => {
            this.bannerImgURL = reader.result;
          }
          this.addShopForm.patchValue({
            shop_banner_media_id: res.id
          });
          break;
        case 'gst':
          this.selectedGSTFile = file.item(0).name;
          var mimeType = file[0].type;
          if (mimeType.match(/image\/*/) == null) {
            alert("Only images are supported.");
            return;
          }
          var reader = new FileReader();
          this.gstImgPath = file;
          reader.readAsDataURL(file[0]);
          reader.onload = (_event) => {
            this.gstImgURL = reader.result;
          }
          this.addShopForm.get('owner').patchValue({
            gst_info_id: res.id
          });
          break;
        case 'pan':
          this.selectedPANFile = file.item(0).name;
          var mimeType = file[0].type;
          if (mimeType.match(/image\/*/) == null) {
            alert("Only images are supported.");
            return;
          }
          var reader = new FileReader();
          this.panImgPath = file;
          reader.readAsDataURL(file[0]);
          reader.onload = (_event) => {
            this.panImgURL = reader.result;
          }
          this.addShopForm.get('owner').patchValue({
            pan_id: res.id
          });
          break;
      }

    })
  }
  deleteImage(type) {
    switch (type) {
      case 'banner':
        this.utility.deleteImage(this.addShopForm.get('shop_banner_media_id').value).subscribe(
          (res: any) => {
            this.bannerImgURL = undefined;
            this.bannerImgPath = undefined;
            this.selectedBannerFile = '';
            this.addShopForm.patchValue({
              shop_banner_media_id: null
            })
            this.utility.showSuccess("Image deleted Successfully");
          },
          (error: any) => {
            this.utility.showError("Error in deleting image");
          }
        )
        break;
      case 'pan':
        this.utility.deleteImage(this.addShopForm.get('owner').get('pan_id').value).subscribe(
          (res: any) => {
            this.panImgURL = undefined;
            this.panImgPath = undefined;
            this.selectedPANFile = '';
            this.addShopForm.patchValue({
              owner: {
                pan_id: null
              }
            })
            this.utility.showSuccess("Image deleted Successfully");
          },
          (error: any) => {
            this.utility.showError("Error in deleting image");
          }
        )
        break;
      case 'gst':
        this.utility.deleteImage(this.addShopForm.get('owner').get('gst_info_id').value).subscribe(
          (res: any) => {
            this.gstImgPath = undefined;
            this.gstImgURL = undefined;
            this.selectedGSTFile = '';
            this.addShopForm.patchValue({
              owner: {
                gst_info_id: null
              }
            })
            this.utility.showSuccess("Image deleted Successfully");
          },
          (error: any) => {
            this.utility.showError("Error in deleting image");
          }
        )
        break;
    }
  }
  addShop() {
    if (this.addShopForm.value.latitude == null)
      this.addShopForm.value.latitude = 0;
    if (this.addShopForm.value.longitude == null)
      this.addShopForm.value.longitude = 0;
    this.addShopForm.value.discount_amount = this.disc_amt;
    this.shopService.addShop(this.addShopForm.value).subscribe(res => {
      if (res.status) {
        this.utility.showSuccess("Successfully added")
        this.router.navigate(['/general-pages/shop-list']);
      } else {
        this.utility.showError("Failed to add shop");
      }
    });
  }
  updateShop() {
    this.shopService.updateShop(this.addShopForm.value, this.editShopId).subscribe(res => {
      if (res.status) {
        this.utility.showSuccess("Successfully Updated");
        this.updated.emit(true);
        this.router.navigate(['/general-pages/shop-list']);
      } else {
        this.utility.showError("Failed to update shop");
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
