import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceAreaService } from 'src/app/services/service-area.service';

@Component({
  selector: 'app-add-service-area',
  templateUrl: './add-service-area.component.html',
  styleUrls: ['./add-service-area.component.scss']
})
export class AddServiceAreaComponent implements OnInit {


  radius: string = "5";
  addServiceAreaForm: FormGroup;
  marker = { lat: 40.73061, lng: -73.935242 }
  constructor(private _fb: FormBuilder, private service: ServiceAreaService) { }

  ngOnInit() {
    this.addServiceAreaForm = this._fb.group({
      name: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      serviceRadius: ['', Validators.required]
    })
  }
  setRadius() {
    return parseFloat(this.addServiceAreaForm.value.serviceRadius) * 1000;
  }
  selectMarker(event) {
    this.marker.lat = parseFloat(event.latLng.lat());
    this.marker.lng = parseInt(event.latLng.lng());
    this.addServiceAreaForm.patchValue({
      latitude: event.latLng.lat(),
      longitude: event.latLng.lng()
    })
  }
  addServiceArea() {
    this.service.addServiceArea(this.addServiceAreaForm.value).subscribe(res => {
      console.log(res);
    })
  }

}
