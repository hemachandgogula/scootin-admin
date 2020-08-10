import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeliverypeopleComponent } from './add-deliverypeople.component';

describe('AddDeliverypeopleComponent', () => {
  let component: AddDeliverypeopleComponent;
  let fixture: ComponentFixture<AddDeliverypeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeliverypeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeliverypeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
