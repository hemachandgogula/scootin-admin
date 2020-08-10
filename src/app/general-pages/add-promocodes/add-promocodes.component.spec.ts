import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPromocodesComponent } from './add-promocodes.component';

describe('AddPromocodesComponent', () => {
  let component: AddPromocodesComponent;
  let fixture: ComponentFixture<AddPromocodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPromocodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPromocodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
