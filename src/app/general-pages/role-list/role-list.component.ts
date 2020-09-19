import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
  page = 1;
  roleList: Role[] = [];
  constructor(private roleService: RoleService) { }

  ngOnInit() {
    this.roleService.getAllAdmin().subscribe((res: Role[]) => {
      this.roleList = res;
    })
  }

}
