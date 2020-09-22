import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  page = 1;
  pageSize = 10;
  employee: any = [];
  constructor(private empService: EmployeeService, private utility: UtilityService) { }

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.empService.getAllEmployees().subscribe(
      (employee: any) => {
        this.employee = employee;
      },
      (error: any) => {
        this.utility.showError("Failed to load Employees");
      }
    )
  }

  deleteEmployee(employeeId:any) {
    this.empService.deleteEmployeeById(employeeId).subscribe(
      (res: any) => {
        this.utility.showSuccess("Employee Deleted successfully");
        this.getAllEmployees();
      },
      (error: any) => {
        this.utility.showError("Failed to load Employees");
      }
    )
  }

}
