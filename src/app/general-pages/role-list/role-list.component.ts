import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
page=1;
  constructor() { }

  ngOnInit() {
  }

}
