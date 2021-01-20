import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '@app/_core/core.index';
import { ErrorHandlerService } from './error-handler.service';

describe('ErrorHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule, 
      HttpClientTestingModule
    ],
    providers: [
      AuthenticationService
    ]
  }));

  it('should be created', () => {
    const service: ErrorHandlerService = TestBed.get(ErrorHandlerService);
    expect(service).toBeTruthy();
  });
});
