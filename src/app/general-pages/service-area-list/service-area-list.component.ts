import { Component, OnInit } from '@angular/core';
import { ServiceArea } from 'src/app/models/service-area';
import { ServiceAreaService } from 'src/app/services/service-area.service';

@Component({
  selector: 'app-service-area-list',
  templateUrl: './service-area-list.component.html',
  styleUrls: ['./service-area-list.component.scss']
})
export class ServiceAreaListComponent implements OnInit {

  page = 1;
  serviceAreaList: ServiceArea[] = [];
  constructor(private serviceAreaService: ServiceAreaService) { }

  ngOnInit() {
    this.serviceAreaService.getAllServiceArea().subscribe((res: ServiceArea[]) => {
      this.serviceAreaList = res;
    })
  }

}
