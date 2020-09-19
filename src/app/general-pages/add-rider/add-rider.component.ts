import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dropdown } from 'src/app/models/dropdown';
import { Media } from 'src/app/models/media';
import { ServiceArea } from 'src/app/models/service-area';
import { RiderService } from 'src/app/services/rider.service';
import { ServiceAreaService } from 'src/app/services/service-area.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-rider',
  templateUrl: './add-rider.component.html',
  styleUrls: ['./add-rider.component.scss']
})
export class AddRiderComponent implements OnInit {

  addRiderForm: FormGroup;
  serviceAreaList: Dropdown[] = [];
  selectedDLFile: string = '';
  selectedAadharFile: string = '';
  riderPhoto: string = '';
  genderList: Dropdown[] = [
    { key: 'M', value: 'Male' },
    { key: 'F', value: 'Female' }
  ]
  constructor(private fb: FormBuilder, private serviceAreaService: ServiceAreaService, private riderService: RiderService, private utility: UtilityService) { }

  ngOnInit() {
    this.serviceAreaService.getAllServiceArea().subscribe((res: ServiceArea[]) => {
      this.serviceAreaList = this.utility.generateDropDownList('id', 'name', res);
    })
    this.addRiderForm = this.fb.group({
      lastName: [''],
      firstName: [''],
      gender: [''],
      email: [''],
      mobileNumber: [''],
      password: [''],
      profileMediaId: ['1'],
      aadharCard: [''],
      aadharCardMediaId: ['1'],
      drivingLicence: [''],
      drivingLicenceMediaId: ['1'],
      latitude: ['0'],
      longitude: ['0'],
      serviceAreaId: ['']
    })
  }
  uploadImage(file, type) {
    this.utility.uploadImage(file.item(0)).subscribe((res: Media) => {
      switch (type) {
        case 'aadhar':
          this.selectedAadharFile = file.item(0).name;
          this.addRiderForm.patchValue({
            aadharCardMediaId: res.id
          });
          break;
        case 'dl':
          this.selectedDLFile = file.item(0).name;
          this.addRiderForm.patchValue({
            drivingLicenceMediaId: res.id
          });
          break;
        case 'profile':
          console.log(this.utility.convertToBase64(file.item(0)))
          this.addRiderForm.patchValue({
            profileMediaId: res.id
          });
          break;
      }

    })
  }
  addRider() {
    if (this.addRiderForm.valid) {
      this.riderService.addRider(this.addRiderForm.value).subscribe(res => {
        if(res){
          this.addRiderForm.reset();
          this.utility.showSuccess("Successfully Added");
        }
      })
    }
  }
  selectMarker(event) {
    this.addRiderForm.patchValue({
      latitude: event.coords.lat,
      longitude: event.coords.lng
    })
  }
}
