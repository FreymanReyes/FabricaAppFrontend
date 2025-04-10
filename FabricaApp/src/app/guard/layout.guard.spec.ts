import { TestBed } from '@angular/core/testing';

import { LayoutGuard } from './layout.guard';

describe('LayoutGuard', () => {
  let guard: LayoutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LayoutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
