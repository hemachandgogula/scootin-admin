import { Component, OnInit } from '@angular/core';
import { RiderService } from 'src/app/services/rider.service';
import { Rider } from 'src/app/models/rider';

@Component({
  selector: 'app-rider-list',
  templateUrl: './rider-list.component.html',
  styleUrls: ['./rider-list.component.scss']
})
export class RiderListComponent implements OnInit {

  riderList: Rider[] = [];
  page=1;
  constructor(private riderService: RiderService) { }

  ngOnInit() {
    this.riderService.getAllRider().subscribe((res: Rider[]) => {
      this.riderList = res;
    })
  }

}
