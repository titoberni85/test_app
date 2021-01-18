import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { ImageListComponent } from './image-list.component';
import { Item } from '../interfaces/item';

describe('ImageListComponent', () => {
  let component: ImageListComponent;
  let fixture: ComponentFixture<ImageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageListComponent ],
      imports: [
        ReactiveFormsModule,
        InfiniteScrollModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate array with twenty items', () => {
    expect(component.arrayDataToShow).toHaveSize(20);
  });

  it('should to have an array of Item Objects', () => {
    expect(component.arrayDataToShow).toBeInstanceOf(Array);
    expect(component.arrayDataToShow[0].photo).toEqual('https://picsum.photos/id/1/500/500');
  });

  it('should get the next twenty items ant length to equals forty', () => {
    component.onScroll();
    expect(component.arrayDataToShow).toHaveSize(40);
  });

  it('should to reset the showed data and search inputs when change searchType', () => {
    component.f.id.setValue('1');
    component.onChangeSearchType();
    expect(component.f.id.value).toEqual(null);
    expect(component.arrayDataToShow).toHaveSize(20);
  });

  it('should to reset search inputs when change the search term and this is empty', () => {
    component.onChangeSearchTerm();
    expect(component.arrayDataToShow).toHaveSize(20);
    expect(component.f.id.value).toEqual('');
  });

  it('should to reset items to show when change SearchType', () => {
    component.onScroll();
    expect(component.arrayDataToShow).toHaveSize(40);
    component.onChangeSearchType();
    expect(component.arrayDataToShow).toHaveSize(20);
  });

  it('should to search items by Id', () => {
    component.f.id.setValue('1');
    component.searchItems();
    expect(component.arrayDataToShow).toHaveSize(1);
  });

  it('should to search items by text', () => {
    component.f.searchType.setValue('text');
    component.f.text.setValue('pepe');
    component['arrayDataOriginal'] = [
      {
        id: 1,
        photo: `https://picsum.photos/id/1/500/500`,
        text: 'pepe'
      },
      {
        id: 2,
        photo: `https://picsum.photos/id/2/500/500`,
        text: 'pepe'
      },
      {
        id: 3,
        photo: `https://picsum.photos/id/3/500/500`,
        text: 'ricardo'
      }
    ];
    component.searchItems();
    expect(component.arrayDataToShow).toHaveSize(2);
  });

  it('should to scroll Top', () => {
    document.documentElement.scrollTop = 1000;
    component.scrollTop();
    expect(document.documentElement.scrollTop).toBe(0);
  });

  it('should to update image url when there is an error image downloading', () => {
    component.updateImageOnError(0);
    expect(component.arrayDataToShow[0].photo).toMatch('assets/images/no-image-found.jpg');
  });

});
