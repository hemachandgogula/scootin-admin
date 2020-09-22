import { Component, OnInit } from '@angular/core';
import { ServiceArea } from 'src/app/models/service-area';
import { ServiceAreaService } from 'src/app/services/service-area.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-service-area-list',
  templateUrl: './service-area-list.component.html',
  styleUrls: ['./service-area-list.component.scss']
})
export class ServiceAreaListComponent implements OnInit {
  page = 1;
  pageSize = 10;
  serviceAreaList: ServiceArea[] = [];
  constructor(private serviceAreaService: ServiceAreaService, private utility: UtilityService, private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
    this.getServiceArea();
  }
  deleteServiceArea(id: number) {
    this.confirmDialogService.confirmThis("Are you sure to delete?", () => {
      this.serviceAreaService.deleteServiceArea(id).subscribe(res => {
        this.utility.showSuccess("Successfully Deleted");
        this.getServiceArea();
      });
    }, () => {
    })

  }

  getServiceArea() {
    this.serviceAreaService.getAllServiceArea().subscribe((res: ServiceArea[]) => {
      this.serviceAreaList = res;
    })
  }

}
