import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-area-list',
  templateUrl: './service-area-list.component.html',
  styleUrls: ['./service-area-list.component.scss']
})
export class ServiceAreaListComponent implements OnInit {

  page=1;
  constructor() { }

  ngOnInit() {
  }

}
