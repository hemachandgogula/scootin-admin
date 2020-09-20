import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss']
})
export class SelectDropdownComponent implements OnInit {

  @Input() list: any[] = [];
  @Input() placeholder: string;
  @Input() parentForm: FormGroup;
  @Input() controlName: string;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  selectedValue: string;

  ChangeSortOrder(newValue) {
    this.selectedValue = newValue.value;
    this.valueChange.emit(newValue.key);
    if (this.parentForm)
      this.parentForm.patchValue({
        [this.controlName]: newValue.key
      })
  }
  constructor() { }

  ngOnInit() {
    this.selectedValue = this.placeholder;
  }

}
