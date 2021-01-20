import { Component, OnInit, OnChanges, HostListener, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { ImageListService } from '../../services/image-list.service';
import { ImageItem } from '../../interfaces/image-item';
import { IMAGELIST_LITERALS } from '../../constants/constants';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnChanges {

  @Input() imageList: ImageItem[] = [];
  @Input() searchTerm: string = '';
  
  public literals = IMAGELIST_LITERALS;
  public showList: boolean = false;
  public showGoUpButton: boolean = false;
  public imageListToShow: ImageItem[] = [];

  private readonly ERROR_IMAGE_URL: string = 'assets/images/no-image-found.jpg';
  private readonly ITEMS_PER_REQUEST: number = 12;

  private showScrollHeight = 400;
  private hideScrollHeight = 200;
  

  constructor(
    private service: ImageListService,
    private cd: ChangeDetectorRef
  ) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if ((window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if (this.showGoUpButton &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop)
      < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imageList'].previousValue !== changes['imageList'].currentValue) {
      this.imageListToShow = [];
      this.getNextItems();
    }
  }

  onScroll(): void {
    this.getNextItems();
  }

  scrollTop(): void {
    document.documentElement.scrollTop = 0;
  }

  private getNextItems(): void {
    let nextItems = this.imageList.slice(this.imageListToShow.length, this.imageListToShow.length + this.ITEMS_PER_REQUEST);
    nextItems.forEach((item) => {
      this.getImage(item);
    });
    this.imageListToShow = this.imageListToShow.concat(nextItems);
    this.showList = this.imageListToShow.length > 0 ? true : false;
    this.cd.detectChanges();
  }

  private getImage(item: ImageItem): void {
    this.service.getImage(item.photoUrl).subscribe(data => {
      this.createImageFromBlob(data, item);
    }, () => {
      this.updateImageOnError(item);
    });
  }

  private createImageFromBlob(image: Blob, item: ImageItem): void {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      item.image = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
    // item.image = URL.createObjectURL(image)
  }

  private updateImageOnError(item: ImageItem): void {
    item.image = this.ERROR_IMAGE_URL;
  }

}