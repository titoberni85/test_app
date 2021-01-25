import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageListModule } from '../../image-list.module';
import { FilterComponent } from './filter.component';


describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ ImageListModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has searchForm iniciated', () => {
    expect(component.searchForm.controls).toHaveSize(3);
  });

  it('should reset searchForm', () => {
    component.form.id.setValue('1');
    expect(component.form.id.value).toBe('1');
    component.resetFilter();
    expect(component.form.id.value).toBe(null);
  });

  it('should search item by id', () => {
    component.form.id.setValue('1');
    component.imageList = [
      {
        id: 1,
        photoUrl: `https://picsum.photos/id/1/500/500`,
        text: 'pepe'
      },
      {
        id: 2,
        photoUrl: `https://picsum.photos/id/2/500/500`,
        text: 'pepe'
      }
    ];
    component.searchItems();
    expect(component['imageListFiltered']).toHaveSize(1);
    expect(component['imageListFiltered'][0].id).toBe(1);
  });

  it('should search items by text', () => {
    component.form.searchType.setValue('text');
    component.form.text.setValue('pedro');
    component.imageList = [
      {
        id: 1,
        photoUrl: `https://picsum.photos/id/1/500/500`,
        text: 'Pedro Juan'
      },
      {
        id: 2,
        photoUrl: `https://picsum.photos/id/2/500/500`,
        text: 'Pedro José'
      },
      {
        id: 3,
        photoUrl: `https://picsum.photos/id/3/500/500`,
        text: 'Ricardo José'
      }
    ];
    component.searchItems();
    expect(component['imageListFiltered']).toHaveSize(2);
  });

});
