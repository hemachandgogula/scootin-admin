import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { Media } from 'src/app/models/media';
import { EmployeeService } from 'src/app/services/employee.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: FormGroup;
  selectedPANFile: string = '';
  selectedAadharFile: string = '';

  panImagePath: any;
  panImgURL: any;
  aadharImagePath: any;
  aadharImgURL: any;
  @Output() updated: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() edit: boolean = false;
  @Input() set editEmployee(editEmployee: Employee) {
    if (editEmployee) {
      this.addEmployeeForm.patchValue({
        first_name: editEmployee.firstName,
        last_name: editEmployee.lastName,
        email: editEmployee.email,
        description: editEmployee.description,
        mobile_number: editEmployee.mobileNumber,
        //employee_status: editEmployee.employeeStatus,
        pan_number: editEmployee.panNumber,
        pan_number_reference: editEmployee.panReference ? editEmployee.panReference.id : null
      })
      this.editEmployeeId = editEmployee.id;
    }
  }
  editEmployeeId: number;
  constructor(private _fb: FormBuilder, private empService: EmployeeService, private utility: UtilityService, private router: Router) {
    this.addEmployeeForm = this._fb.group({
      first_name: [],
      last_name: [],
      email: [],
      description: [],
      mobile_number: [],
      // employee_status: [],
      pan_number: [],
      pan_number_reference: []
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    this.empService.addEmployee(this.addEmployeeForm.value).subscribe(
      (res: any) => {
        this.utility.showSuccess("Successfully Added");
        this.router.navigate(['/general-pages/employee-list']);
      }, (error: any) => {
        this.utility.showError("Failed to add Employee");
      }
    )
  }
  updateEmployee() {
    this.empService.updateEmployee(this.addEmployeeForm.value, this.editEmployeeId).subscribe(
      (res: any) => {
        this.utility.showSuccess("Successfully updated");
        window.location.reload();
        this.router.navigate(['/general-pages/employee-list']);
      },
      (error: any) => {
        this.utility.showError("Failed to add Employee");
      }
    )
  }
  uploadImage(file, type) {
    this.utility.uploadImage(file.item(0)).subscribe((res: Media) => {
      switch (type) {
        case 'pan':
          this.selectedPANFile = file.item(0).name;
          var mimeType = file[0].type;
          if (mimeType.match(/image\/*/) == null) {
            alert("Only images are supported.");
            return;
          }
          var reader = new FileReader();
          this.panImagePath = file;
          reader.readAsDataURL(file[0]);
          reader.onload = (_event) => {
            this.panImgURL = reader.result;
          }
          this.addEmployeeForm.patchValue({
            pan_number_reference: res.id
          });
          break;
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
          this.addEmployeeForm.patchValue({
            aadhar_number_reference: res.id
          });
          break;
      }
    })
  }
  deleteImage(type) {
    switch (type) {
      case 'pan':
        this.utility.deleteImage(this.addEmployeeForm.get('pan_number_reference').value).subscribe(
          (res: any) => {
            this.panImgURL = undefined;
            this.panImagePath = undefined;
            this.selectedPANFile = '';
            this.addEmployeeForm.patchValue({
              pan_number_reference: null
            })
            this.utility.showSuccess("Image deleted Successfully");
          },
          (error: any) => {
            this.utility.showError("Error in deleting image");
          }
        )
        break;
      case 'aadhar':
        this.utility.deleteImage(this.addEmployeeForm.get('aadhar_number_reference').value).subscribe(
          (res: any) => {
            this.aadharImgURL = undefined;
            this.aadharImagePath = undefined;
            this.selectedAadharFile = '';
            this.addEmployeeForm.patchValue({
              aadhar_number_reference: null
            })
            this.utility.showSuccess("Image deleted Successfully");
          },
          (error: any) => {
            this.utility.showError("Error in deleting image");
          }
        )
    }
  }

}
