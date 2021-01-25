import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageListService } from '../services/image-list.service';
import { FilterComponent } from '../components/filter/filter.component';
import { ListComponent } from '../components/list/list.component';
import { ImageItem } from '../interfaces/image-item';
import { IMAGELIST_LITERALS } from '../constants/constants';


@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {

  public readonly literals = IMAGELIST_LITERALS;
  
  public imageList: ImageItem[] = [];
  public imageListFiltered: ImageItem[] = [];
  public searchTerm: string = '';
  
  @ViewChild('filter') filter!: FilterComponent;
  @ViewChild('list') list!: ListComponent;
  
  constructor(private service: ImageListService) { }


  ngOnInit(): void {
    this.getItemsList();
  }

  setFilteredList(imageListFiltered: ImageItem[]): void {
    this.imageListFiltered = imageListFiltered;
    this.searchTerm = this.filter.form.text.value;
  }

  private getItemsList(): void {
    this.service.getItemList().subscribe((imageList) => {
      this.imageList = imageList;
      this.imageListFiltered = JSON.parse(JSON.stringify(this.imageList));
    });
  }

}