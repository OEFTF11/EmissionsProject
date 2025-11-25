import { TestBed } from '@angular/core/testing';

import { Emissions } from './emissions';

describe('Emissions', () => {
  let service: Emissions;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Emissions);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
