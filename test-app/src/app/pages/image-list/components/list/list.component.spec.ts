import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageListModule } from '../../image-list.module';
import { ImageItem } from '../../interfaces/image-item';
import { ImageListComponent } from '../../_main/image-list.component';
import { ListComponent } from './list.component';


describe('ListComponent', () => {
  let component: ListComponent;
  let imageListComponent: ImageListComponent;
  let imageListFixture: ComponentFixture<ImageListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ 
        ImageListModule,
        HttpClientTestingModule 
      ],
      declarations: [
        ImageListComponent,
        ListComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    imageListFixture = TestBed.createComponent(ImageListComponent);
    imageListComponent = imageListFixture.componentInstance;
    imageListFixture.detectChanges();
    component = imageListComponent.list;
    spyOn(component, 'ngOnChanges').and.callThrough(); // to set imageList @Input in ListComponent with 4000 items
    imageListFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.imageList).toHaveSize(4000);
  });

  it('should have first items', () => {
    expect(component.imageListToShow).toHaveSize(component['ITEMS_PER_REQUEST']);
  });

  it('should get the next items', () => {
    component.onScroll();
    expect(component.imageListToShow).toHaveSize(component['ITEMS_PER_REQUEST']  * 2);
  });

  it('should go to top on window', () => {
    document.documentElement.scrollTop = 800;
    expect(document.documentElement.scrollTop).toBe(800);
    component.scrollTop();
    expect(document.documentElement.scrollTop).toBe(0);
  });

});
