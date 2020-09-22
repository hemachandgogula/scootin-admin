import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dropdown } from 'src/app/models/dropdown';
import { Media } from 'src/app/models/media';
import { Rider } from 'src/app/models/rider';
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
  @Output() updated: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() edit: boolean = false;
  @Input() set editRider(editRider: Rider) {
    if (editRider) {
      this.addRiderForm.patchValue({
        lastName: editRider.lastName,
        firstName: editRider.firstName,
        gender: editRider.gender,
        email: editRider.email,
        mobileNumber: editRider.mobileNumber,
        password: editRider.password,
        profileMediaId: editRider.profilePictureReference ? editRider.profilePictureReference.id : null,
        aadharCard: editRider.aadharCard,
        aadharCardMediaId: editRider.aadharCardReference ? editRider.aadharCardReference.id : null,
        drivingLicence: editRider.drivingLicence,
        drivingLicenceMediaId: editRider.drivingLicenceReference ? editRider.drivingLicenceReference.id : null,
        latitude: editRider.latitude,
        longitude: editRider.longitude,
        serviceAreaId: editRider.serviceID ? editRider.serviceID.id : null,
        address: {
          addressType: editRider.address ? editRider.address.addressType : 'RIDER',
          address_line_1: editRider.address ? editRider.address.addressLine1 : null,
          address_line_2: editRider.address ? editRider.address.addressLine2 : null,
          city: editRider.address ? editRider.address.city : null,
          pincode: editRider.address ? editRider.address.pincode : null,
          state_id: editRider.address ? editRider.address.stateDetails.id : null
        }
      })
      this.editRiderId = editRider.id;
    }
  }
  editRiderId: number;
  addRiderForm: FormGroup;
  serviceAreaList: Dropdown[] = [];
  selectedDLFile: string = '';
  selectedAadharFile: string = '';
  riderPhoto: string = '';
  genderList: Dropdown[] = [
    { key: 'M', value: 'Male' },
    { key: 'F', value: 'Female' }
  ]
  stateList: Dropdown[] = [];
  selectedCountry: string = 'India';
  constructor(private fb: FormBuilder, private serviceAreaService: ServiceAreaService, private riderService: RiderService, private utility: UtilityService) { }

  ngOnInit() {
    this.serviceAreaService.getAllServiceArea().subscribe((res: ServiceArea[]) => {
      this.serviceAreaList = this.utility.generateDropDownList('id', 'name', res);
    })
    this.utility.getAllState().subscribe((res: any[]) => {
      this.stateList = this.utility.generateDropDownList('id', 'name', res);
    })
    this.addRiderForm = this.fb.group({
      lastName: [],
      firstName: [],
      gender: [],
      email: [],
      mobileNumber: [],
      password: [],
      profileMediaId: [],
      aadharCard: [],
      aadharCardMediaId: [],
      drivingLicence: [],
      drivingLicenceMediaId: [],
      latitude: [],
      longitude: [],
      serviceAreaId: [],
      address: this.fb.group({
        addressType: ['DELIVERY'],
        address_line_1: [],
        address_line_2: [],
        city: [],
        pincode: [],
        state_id: []
      })
    })
  }
  imagePath: any;
  imgURL: any;
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
          this.riderPhoto = file.item(0).name;
          //this.profile = file.item(0);
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
          this.addRiderForm.patchValue({
            profileMediaId: res.id
          });
          break;
      }
    })
  }

  deleteProfile() {
    this.utility.deleteImage(this.addRiderForm.get('profileMediaId').value).subscribe(
      (res: any) => {
        this.imgURL = undefined;
        this.imagePath = undefined;
        this.utility.showSuccess("Image deleted Successfully");
      },
      (error: any) => {
        this.utility.showError("Error in deleting image");
      }
    )
  }

  setCountry($event) {

  }
  addRider() {
    if (this.addRiderForm.valid) {
      this.riderService.addRider(this.addRiderForm.value).subscribe(res => {
        if (res) {
          this.addRiderForm.reset();
          this.utility.showSuccess("Successfully Added");
        }
      })
    }
  }
  updateRider() {
    if (this.addRiderForm.valid) {
      this.riderService.updateRider(this.addRiderForm.value, this.editRiderId).subscribe(res => {
        if (res) {
          this.addRiderForm.reset();
          this.utility.showSuccess("Successfully Updated");
          this.updated.emit(true);
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
