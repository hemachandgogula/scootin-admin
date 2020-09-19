import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dropdown } from 'src/app/models/dropdown';
import { ServiceArea } from 'src/app/models/service-area';
import { RoleService } from 'src/app/services/role.service';
import { ServiceAreaService } from 'src/app/services/service-area.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {

  addRoleForm: FormGroup;
  serviceAreaList: Dropdown[] = [];
  constructor(private _fb: FormBuilder, private serviceAreaService: ServiceAreaService, private utility: UtilityService, private roleService: RoleService) { }

  ngOnInit() {
    this.serviceAreaService.getAllServiceArea().subscribe((res: ServiceArea[]) => {
      this.serviceAreaList = this.utility.generateDropDownList('id', 'name', res);
    })
    this.addRoleForm = this._fb.group({
      firstName: [''],
      lastName: [''],
      mobileNumber: [''],
      password: [''],
      role: [''],
      email: [''],
      service_id: ['']
    })
  }

  addRole() {
    if (this.addRoleForm.valid) {
      this.roleService.addRole(this.addRoleForm.value).subscribe(res => {
        if (res){
          this.addRoleForm.reset();
          this.utility.showSuccess('Successfully Added');
        }
          
      })
    }
  }

}
