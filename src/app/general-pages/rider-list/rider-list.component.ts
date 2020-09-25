import { Component, OnInit } from '@angular/core';
import { RiderService } from 'src/app/services/rider.service';
import { Rider } from 'src/app/models/rider';
import { UtilityService } from 'src/app/services/utility.service';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';
import { Dropdown } from 'src/app/models/dropdown';
import { ServiceArea } from 'src/app/models/service-area';
import { ServiceAreaService } from 'src/app/services/service-area.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserRole } from 'src/app/enums/user-role.enum';

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
  isSuperAdmin: boolean=false;
  selectedServiceId: number;
  constructor(private riderService: RiderService, private authService: AuthenticationService, private utility: UtilityService, private confirmDialogService: ConfirmDialogService, private serviceAreaService: ServiceAreaService) { }

  ngOnInit() {
    this.serviceAreaService.getAllServiceArea().subscribe((res: ServiceArea[]) => {
      this.serviceAreaList = this.utility.generateDropDownList('id', 'name', res);
      if (this.authService.loggedUserRole == UserRole.ROLE_SUPER_ADMIN) {
        this.getRiderList(this.serviceAreaList[0].key);
        this.isSuperAdmin=true;
      }else{
        this.getRiderList(this.authService.loggedUserServiceArea);       
      }
    });    
  }
  deleteRider(id) {
    this.confirmDialogService.confirmThis("Are you sure to delete?", () => {
      this.riderService.deleteRider(id).subscribe(res => {
        this.utility.showSuccess("Successfully Deleted");
        if (this.authService.loggedUserRole == UserRole.ROLE_SUPER_ADMIN) {
          this.getRiderList(this.serviceAreaList[0].key);
        } else {
          this.getRiderList(this.authService.loggedUserServiceArea);
        }
      });
    }, () => {
    })

  }
  getRiderList(serviceId) {
    this.selectedServiceId=serviceId;
    this.riderService.getAllRider(this.selectedServiceId).subscribe((res: Rider[]) => {
      this.riderList = res;
    })
  }
  toggleRider(event, riderId: number) {
    this.riderService.toggleRider(event.target.checked, riderId).subscribe(res => {
      event.target.checked ? this.utility.showSuccess("Successfully Enabled") : this.utility.showSuccess("Successfully Disabled")
    })
  }

}
