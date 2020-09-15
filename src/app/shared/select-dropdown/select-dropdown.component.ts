import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss']
})
export class SelectDropdownComponent implements OnInit {

  @Input() list: any[] = [];
  @Input() placeholder: string;
  selectedValue: string;

  ChangeSortOrder(newValue) {
    this.selectedValue = newValue.value;
  }
  constructor() { }

  ngOnInit() {
    this.selectedValue = this.placeholder;
  }

}
