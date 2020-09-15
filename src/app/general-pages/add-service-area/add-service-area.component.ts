import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-service-area',
  templateUrl: './add-service-area.component.html',
  styleUrls: ['./add-service-area.component.scss']
})
export class AddServiceAreaComponent implements OnInit {

  lat = 40.73061;
  lng = -73.935242;
  radius: string = "5";
  constructor() { }

  ngOnInit() {
  }
  setRadius() {
    return parseFloat(this.radius) * 1000;
  }

}
