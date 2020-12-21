import { TestBed } from '@angular/core/testing';

import { Admin.UsersService } from './admin.users.service';

describe('Admin.UsersService', () => {
  let service: Admin.UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Admin.UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
