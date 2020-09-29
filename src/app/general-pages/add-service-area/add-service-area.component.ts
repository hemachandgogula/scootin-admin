import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceArea } from 'src/app/models/service-area';
import { ServiceAreaService } from 'src/app/services/service-area.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-service-area',
  templateUrl: './add-service-area.component.html',
  styleUrls: ['./add-service-area.component.scss']
})
export class AddServiceAreaComponent implements OnInit {

  @Output() updated: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() edit: boolean = false;
  @Input() set editServiceArea(editServiceArea: ServiceArea) {
    if (editServiceArea) {
      this.addServiceAreaForm.patchValue({
        name: editServiceArea.name,
        latitude: editServiceArea.latitude,
        longitude: editServiceArea.longitude,
        serviceRadius: editServiceArea.serviceRadius
      })
      this.marker = { lat: editServiceArea.latitude, lng: editServiceArea.longitude };
      this.editServiceAreaId = editServiceArea.id;
    }
  }
  editServiceAreaId: number;
  addServiceAreaForm: FormGroup;
  marker = { lat: 28.207609, lng: 79.826660 }
  constructor(private _fb: FormBuilder, private router: Router, private service: ServiceAreaService, private utility: UtilityService) { }

  ngOnInit() {
    this.addServiceAreaForm = this._fb.group({
      name: ['', Validators.required],
      latitude: [this.marker.lat, Validators.required],
      longitude: [this.marker.lng, Validators.required],
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
      // this.addServiceAreaForm.reset();
      this.router.navigate(['/general-pages/service-area-list']);
    })
  }
  updateServiceArea() {
    this.service.updateServiceArea(this.addServiceAreaForm.value, this.editServiceAreaId).subscribe(res => {
      this.utility.showSuccess("Successfully updated");
      console.log('44')
      // this.addServiceAreaForm.reset();
      this.updated.emit(true);
      console.log('sdfdsf')
      this.router.navigate(['/general-pages/service-area-list']);
    })
  }
}
