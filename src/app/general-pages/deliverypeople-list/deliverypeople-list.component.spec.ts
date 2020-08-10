import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverypeopleListComponent } from './deliverypeople-list.component';

describe('DeliverypeopleListComponent', () => {
  let component: DeliverypeopleListComponent;
  let fixture: ComponentFixture<DeliverypeopleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverypeopleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverypeopleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
