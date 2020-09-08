import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { UtilityService } from 'src/app/services/utility.service';
import { Media } from 'src/app/models/media';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.scss']
})
export class AddShopComponent implements OnInit, AfterViewInit {

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat = 40.73061;
  lng = -73.935242;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });

  addShopForm: FormGroup;
  categoryList: Category[] = [];
  selectedFile: string = '';
  isShopAdded: boolean = false;
  constructor(private _fb: FormBuilder, private categoryService: CategoryService, private utility: UtilityService, private shopService: ShopService) { }

  ngOnInit() {
    this.categoryService.getAllCategory().subscribe((res: Category[]) => {
      this.categoryList = res;
    })
    this.addShopForm = this._fb.group({
      name: [''],
      city: [''],
      open_time: [''],
      close_time: [''],
      latitude: [''],
      longitude: [''],
      category_id: [''],
      media_id: [''],
      owner: this._fb.group({
        last_name: [''],
        first_name: [''],
        email: [''],
        mobile_number: [''],
        password: [''],
        aadhar_card: [''],
        pan_card: [''],
        gst_info: [''],
        city: [''],
        fcm_id: ['']
      }),
      address: this._fb.group({
        address_line_1: [''],
        address_line_2: [''],
        city: [''],
        pincode: [''],
        state_id: ['']
      })
    })
  }
  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);
    this.marker.setMap(this.map);
  }
  uploadBannerImage(file) {
    this.selectedFile = file.item(0).name;
    this.utility.uploadImage(file.item(0)).subscribe((res: Media) => {
      this.addShopForm.patchValue({
        media_id: res.id
      });
    })
  }
  addShop() {
    this.shopService.addShop(this.addShopForm.value).subscribe(res => {
      this.isShopAdded = res.status;
    });
  }
}
