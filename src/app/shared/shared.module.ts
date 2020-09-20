import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDropdownComponent } from './select-dropdown/select-dropdown.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [SelectDropdownComponent, ConfirmDialogComponent
  ],
  exports: [SelectDropdownComponent,ConfirmDialogComponent  ]
})
export class SharedModule { }
