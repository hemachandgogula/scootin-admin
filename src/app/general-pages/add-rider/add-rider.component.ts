import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dropdown } from 'src/app/models/dropdown';
import { Media } from 'src/app/models/media';
import { Rider } from 'src/app/models/rider';
import { ServiceArea } from 'src/app/models/service-area';
import { RiderService } from 'src/app/services/rider.service';
import { ServiceAreaService } from 'src/app/services/service-area.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';

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
  constructor(private fb: FormBuilder, private router: Router, private serviceAreaService: ServiceAreaService, private riderService: RiderService, private utility: UtilityService) { }

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
  dlImagePath: any;
  dlImgURL: any;
  aadharImagePath: any;
  aadharImgURL: any;
  profileImagePath: any;
  profileImgURL: any;
  uploadImage(file, type) {
    this.utility.uploadImage(file.item(0)).subscribe((res: Media) => {
      switch (type) {
        case 'aadhar':
          this.selectedAadharFile = file.item(0).name;
          var mimeType = file[0].type;
          if (mimeType.match(/image\/*/) == null) {
            alert("Only images are supported.");
            return;
          }
          var reader = new FileReader();
          this.aadharImagePath = file;
          reader.readAsDataURL(file[0]);
          reader.onload = (_event) => {
            this.aadharImgURL = reader.result;
          }
          this.addRiderForm.patchValue({
            aadharCardMediaId: res.id
          });
          break;
        case 'dl':
          this.selectedDLFile = file.item(0).name;
          var mimeType = file[0].type;
          if (mimeType.match(/image\/*/) == null) {
            alert("Only images are supported.");
            return;
          }
          var reader = new FileReader();
          this.dlImagePath = file;
          reader.readAsDataURL(file[0]);
          reader.onload = (_event) => {
            this.dlImgURL = reader.result;
          }
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
          this.profileImagePath = file;
          reader.readAsDataURL(file[0]);
          reader.onload = (_event) => {
            this.profileImgURL = reader.result;
          }
          this.addRiderForm.patchValue({
            profileMediaId: res.id
          });
          break;
      }
    })
  }
  deleteImage(type) {
    switch (type) {
      case 'dl':
        this.utility.deleteImage(this.addRiderForm.get('drivingLicenceMediaId').value).subscribe(
          (res: any) => {
            this.dlImgURL = undefined;
            this.dlImagePath = undefined;
            this.selectedDLFile = '';
            this.addRiderForm.patchValue({
              drivingLicenceMediaId: null
            })
            this.utility.showSuccess("Image deleted Successfully");
          },
          (error: any) => {
            this.utility.showError("Error in deleting image");
          }
        )
        break;
      case 'aadhar':
        this.utility.deleteImage(this.addRiderForm.get('aadharCardMediaId').value).subscribe(
          (res: any) => {
            this.aadharImgURL = undefined;
            this.aadharImagePath = undefined;
            this.selectedAadharFile = '';
            this.addRiderForm.patchValue({
              aadharCardMediaId: null
            })
            this.utility.showSuccess("Image deleted Successfully");
          },
          (error: any) => {
            this.utility.showError("Error in deleting image");
          }
        )
        break;
      case 'profile':
        this.utility.deleteImage(this.addRiderForm.get('profileMediaId').value).subscribe(
          (res: any) => {
            this.aadharImgURL = undefined;
            this.aadharImagePath = undefined;
            this.addRiderForm.patchValue({
              profileMediaId: null
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

  setCountry($event) {

  }
  addRider() {
    if (this.addRiderForm.valid) {
      this.riderService.addRider(this.addRiderForm.value).subscribe(res => {
        if (res) {
          // this.addRiderForm.reset();
          this.utility.showSuccess("Successfully Added");
          this.router.navigate(['/general-pages/rider-list']);
        }
      })
    }
  }
  updateRider() {
    if (this.addRiderForm.valid) {
      this.riderService.updateRider(this.addRiderForm.value, this.editRiderId).subscribe(res => {
        if (res) {
          // this.addRiderForm.reset();
          this.utility.showSuccess("Successfully Updated");
          this.updated.emit(true);
          this.router.navigate(['/general-pages/rider-list']);
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
