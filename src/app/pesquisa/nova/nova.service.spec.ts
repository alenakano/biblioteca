import { TestBed } from '@angular/core/testing';

import { NovaService } from './nova.service';

describe('NovaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NovaService = TestBed.get(NovaService);
    expect(service).toBeTruthy();
  });
});
