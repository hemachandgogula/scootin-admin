import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/enums/user-role.enum';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/role.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
  page = 1;
  pageSize = 5;
  roleList: Role[] = [];
  constructor(private roleService: RoleService, private utility: UtilityService, private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
    this.getUserList();
  }

  deleteUser(id) {
    this.confirmDialogService.confirmThis("Are you sure to delete?", () => {
      this.roleService.deleteUser(id).subscribe(res => {
        this.utility.showSuccess("Successfully Deleted");
        this.getUserList();
      });
    }, () => {
    })
  }

  getUserList() {
    this.roleService.getAllAdmin().subscribe((res: Role[]) => {
      this.roleList = res;
      this.roleList.map(m => {
        m.role = UserRole[m.role];
      })
    })
  }

}
