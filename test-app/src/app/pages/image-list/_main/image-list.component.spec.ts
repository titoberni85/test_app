import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageListModule } from '../image-list.module';
import { ImageListComponent } from './image-list.component';


describe('ImageListComponent', () => {
  let component: ImageListComponent;
  let fixture: ComponentFixture<ImageListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ImageListModule,
        HttpClientTestingModule
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

  it('should get array with all items', () => {
    expect(component.imageList).toHaveSize(4000);
    expect(component.imageListFiltered).toHaveSize(4000);
  });

  it('should set imageList with filtered items', () => {
    const imageListFiltered = [
      {
        id: 1,
        photoUrl: `https://picsum.photos/id/1/500/500`,
        text: 'pepe'
      }
    ];
    component.setFilteredList(imageListFiltered);
    expect(component.imageListFiltered).toHaveSize(1);
  });

});
