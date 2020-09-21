import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: FormGroup;
  constructor(private _fb: FormBuilder, private empService: EmployeeService, private utility: UtilityService, private router:Router) {
    this.addEmployeeForm = this._fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      description: [''],
      mobileNumber: [''],
      employeeStatus: ['']
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
      },
      (error: any) => {
        this.utility.showError("Failed to add Employee");
      }
    )
  }

}
