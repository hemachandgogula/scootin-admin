import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceAreaService } from 'src/app/services/service-area.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-service-area',
  templateUrl: './add-service-area.component.html',
  styleUrls: ['./add-service-area.component.scss']
})
export class AddServiceAreaComponent implements OnInit {


  addServiceAreaForm: FormGroup;
  marker = { lat: 28.207609, lng: 79.826660 }
  constructor(private _fb: FormBuilder, private service: ServiceAreaService,private utility:UtilityService) { }

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
    this.marker.lat = parseFloat(event.coords.lat);
    this.marker.lng = parseInt(event.coords.lng);
    this.addServiceAreaForm.patchValue({
      latitude: event.coords.lat,
      longitude: event.coords.lng
    })
  }
  addServiceArea() {
    this.service.addServiceArea(this.addServiceAreaForm.value).subscribe(res => {
     this.utility.showSuccess("Successfully added");
     this.addServiceAreaForm.reset();
    })
  }

}
