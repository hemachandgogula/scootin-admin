import { Component, OnInit } from '@angular/core';
import { RiderService } from 'src/app/services/rider.service';
import { Rider } from 'src/app/models/rider';
import { UtilityService } from 'src/app/services/utility.service';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';
import { Dropdown } from 'src/app/models/dropdown';
import { ServiceArea } from 'src/app/models/service-area';
import { ServiceAreaService } from 'src/app/services/service-area.service';

@Component({
  selector: 'app-rider-list',
  templateUrl: './rider-list.component.html',
  styleUrls: ['./rider-list.component.scss']
})
export class RiderListComponent implements OnInit {

  riderList: Rider[] = [];
  page = 1;
  pageSize = 10;
  editRider;
  serviceAreaList: Dropdown[] = [];
  constructor(private riderService: RiderService, private utility: UtilityService, private confirmDialogService: ConfirmDialogService, private serviceAreaService: ServiceAreaService) { }

  ngOnInit() {
    this.serviceAreaService.getAllServiceArea().subscribe((res: ServiceArea[]) => {
      this.serviceAreaList = this.utility.generateDropDownList('id', 'name', res);
    });
    this.getRiderList();
  }
  deleteRider(id) {
    this.confirmDialogService.confirmThis("Are you sure to delete?", () => {
      this.riderService.deleteRider(id).subscribe(res => {
        this.utility.showSuccess("Successfully Deleted");
        this.getRiderList();
      });
    }, () => {
    })

  }

  getRiderList() {
    this.riderService.getAllRider().subscribe((res: Rider[]) => {
      this.riderList = res;
    })
  }

}
