/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServiceAreaService } from './service-area.service';

describe('Service: ServiceArea', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceAreaService]
    });
  });

  it('should ...', inject([ServiceAreaService], (service: ServiceAreaService) => {
    expect(service).toBeTruthy();
  }));
});
