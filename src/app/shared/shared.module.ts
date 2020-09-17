import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDropdownComponent } from './select-dropdown/select-dropdown.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [SelectDropdownComponent
  ],
  exports: [SelectDropdownComponent]
})
export class SharedModule { }
