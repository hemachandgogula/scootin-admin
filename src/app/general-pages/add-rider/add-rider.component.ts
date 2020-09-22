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
  @Output() updated:EventEmitter<boolean>=new EventEmitter<boolean>();
  @Input() edit: boolean = false;
  @Input() set editRider(editRider: Rider) {
    this.addRiderForm.patchValue({
      lastName: editRider.lastName,
      firstName: editRider.firstName,
      gender: editRider,
      email: '',
      mobileNumber: '',
      password: '',
      profileMediaId: '',
      aadharCard: '',
      aadharCardMediaId: '',
      drivingLicence: '',
      drivingLicenceMediaId: '',
      latitude: '',
      longitude: '',
      serviceAreaId: [''],
      address: {
        addressType: 'DELIVERY',
        address_line_1: '',
        address_line_2: '',
        city: '',
        pincode: '',
        state_id: ''
      }
    })
  }
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
      serviceAreaId: [''],
      address: this.fb.group({
        addressType: ['DELIVERY'],
        address_line_1: [''],
        address_line_2: [''],
        city: [''],
        pincode: [''],
        state_id: ['']
      })
    })
  }
  imagePath:any;
  imgURL:any;
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
      (res:any)=> {
        this.imgURL = undefined;
        this.imagePath = undefined;
        this.utility.showSuccess("Image deleted Successfully");
      },
      (error:any)=> {
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
  selectMarker(event) {
    this.addRiderForm.patchValue({
      latitude: event.coords.lat,
      longitude: event.coords.lng
    })
  }
}
