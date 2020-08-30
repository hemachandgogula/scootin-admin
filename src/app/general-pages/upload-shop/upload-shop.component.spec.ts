import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadShopComponent } from './upload-shop.component';

describe('UploadShopComponent', () => {
  let component: UploadShopComponent;
  let fixture: ComponentFixture<UploadShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
