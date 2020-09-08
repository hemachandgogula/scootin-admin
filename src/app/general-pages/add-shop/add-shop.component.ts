import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

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
  constructor(private _fb: FormBuilder, private categoryService: CategoryService) { }

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
      owner: this._fb.group({
        last_name: [''],
        first_name: [''],
        email: [''],
        mobile_number: [''],
        password: [''],
        banner_image: [''],
        aadhar_card: [''],
        pan_card: [''],
        gst_info: [''],
        city: [''],
        fcm_id: [''],
        active: [''],
        deleted: [''],
        id: ['']
      }),
      address: this._fb.group({
        addressType: [''],
        address_line_1: [''],
        address_line_2: [''],
        city: [''],
        id: [''],
        pincode: [''],
        state_id: [''],
        userInfoId: ['']
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

}
