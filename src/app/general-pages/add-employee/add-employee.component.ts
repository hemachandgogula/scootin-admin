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
  selectedFile: string = '';
  @Output() updated: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() edit: boolean = false;
  @Input() set editEmployee(editEmployee: Employee) {
    if (editEmployee) {
      this.addEmployeeForm.patchValue({
        first_name: editEmployee.firstName,
        last_name: editEmployee.lastName,
        email: editEmployee.email,
        description: editEmployee.description,
        mobileNumber: editEmployee.mobileNumber,
        employee_status: editEmployee.employeeStatus,
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
      mobileNumber: [],
      employee_status: [],
      pan_number: [],
      pan_number_reference: []
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    this.empService.addEmployee(this.addEmployeeForm.value).subscribe(
      (res: any) => {
        this.addEmployeeForm.reset();
        this.utility.showSuccess("Successfully Added");
        this.router.navigate(['/employee-list']);
      }
    )
  }
  updateEmployee() {
    this.empService.updateEmployee(this.addEmployeeForm.value, this.editEmployeeId).subscribe(
      (res: any) => {
        this.addEmployeeForm.reset();
        this.utility.showSuccess("Successfully updated");
        this.router.navigate(['/employee-list']);
      },
      (error: any) => {
        this.utility.showError("Failed to add Employee");
      }
    )
  }
  uploadImage(file) {
    this.utility.uploadImage(file.item(0)).subscribe((res: Media) => {
      this.selectedFile = file.item(0).name;
      this.addEmployeeForm.patchValue({
        pan_number_reference: res.id
      });
    })
  }

}
