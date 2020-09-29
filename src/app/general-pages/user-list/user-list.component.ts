import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList: User[] = [];
  pageLoaded = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.pageLoaded = true;
    this.userService.getAllUser().subscribe((res: User[]) => {
      this.pageLoaded = false;
      this.userList = res;
    })
  }

}
