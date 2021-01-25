import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ErrorHandlerService } from 'src/app/_shared/services/error-handler/error-handler.service';

import { ImageListService } from './image-list.service';

describe('ImageListService', () => {
  let service: ImageListService;
  let httpClientSpy: { getImage: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ImageListService ]
    })
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['getImage']);
    service = new ImageListService(httpClientSpy as any, new ErrorHandlerService());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getItemList should return the itemList with 4000 elements', (done: DoneFn) => {
    service.getItemList().subscribe(itemList => {
      expect(itemList).toHaveSize(4000);
      done();
    });
  });

  it('#ItemList first element should return the itemList with 4000 elements', (done: DoneFn) => {
    service.getItemList().subscribe(itemList => {
      expect(itemList[0].id).toBe(1);
      expect(itemList[0].photoUrl).toBe('https://picsum.photos/id/1/500/500');
      done();
    });
  });

  it('#getImage should request image from api ', (done: DoneFn) => {
    const getFakeImage = (): Blob => {
      const blob = new Blob([''], { type: 'image/jpeg' });
      return blob;
    };
    let fakeImage = getFakeImage();
    let spy = spyOn(service, 'getImage').and.returnValue(of(fakeImage));
    httpClientSpy.getImage.and.returnValue(of(fakeImage));
    service.getImage('fakeurl').subscribe(image => {
      expect(image).toBe(fakeImage);
      done();
    });
  });

});
