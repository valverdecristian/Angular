import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { miGuardGuard } from './mi-guard.guard';

describe('miGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => miGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
