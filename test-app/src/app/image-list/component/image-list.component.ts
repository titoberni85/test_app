import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Item } from '../interfaces/item';

// JS library for real random words  
const randomWords = require('random-words');

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})

export class ImageListComponent implements OnInit {

  private ERROR_IMAGE_URL: string = 'assets/images/no-image-found.jpg';
  private ITEMS_PER_PAGE: number = 20;
  private showScrollHeight = 400;
  private hideScrollHeight = 200;
  private arrayDataOriginal: Item[] = [];
  private arrayData: Item[] = [];

  public arrayDataToShow: Item[] = [];
  public searchForm: FormGroup;
  public showGoUpButton: boolean = false;
  

  constructor() {
    this.searchForm = new FormGroup({
      searchType: new FormControl('id'),
      id: new FormControl(''),
      text: new FormControl('')
    });
  }

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

  get f() { return this.searchForm.controls }

  ngOnInit(): void {
    this.generateArrayData();
    this.getNextItems();
  }

  // Private functions
  private generateArrayData(): void {
    for (let index = 1; index <= 4000; index++) {
      let item: Item = {
        id: index,
        photo: `https://picsum.photos/id/${index}/500/500`,
        text: randomWords({ exactly: 10, join: ' ', maxLength: 7 })
      }
      this.arrayDataOriginal.push(item);
      this.arrayData = JSON.parse(JSON.stringify(this.arrayDataOriginal));
    }
  }

  private getNextItems(): void {
    let nextItems = this.arrayData.slice(this.arrayDataToShow.length, this.arrayDataToShow.length + this.ITEMS_PER_PAGE);
    this.arrayDataToShow = this.arrayDataToShow.concat(nextItems);
  }

  private searchById(): void {
    this.arrayData = this.arrayDataOriginal.filter((item) => {
      return item.id === parseInt(this.f.id.value);
    });
  }

  private searchByText(): void {
    this.arrayData = this.arrayDataOriginal.filter((item) => {
      return item.text.indexOf(this.f.text.value) !== -1;
    });
  }

  private resetDataToShow(): void {
    this.arrayDataToShow = [];
    this.arrayData = JSON.parse(JSON.stringify(this.arrayDataOriginal));
    this.getNextItems();
  }

  // Public functions
  public onChangeSearchType(): void {
    this.f.id.reset();
    this.f.text.reset();
    this.resetDataToShow();
  }

  public onChangeSearchTerm(): void {
    if (!this.f.id.value && !this.f.text.value) {
      this.resetDataToShow();
    }
  }

  public searchItems(): void {
    if (this.f.searchType.value === 'id') {
      this.searchById();
    } else {
      this.searchByText();
    }
    this.arrayDataToShow = [];
    this.getNextItems();
  }

  public onScroll(): void {
    this.getNextItems();
  }

  public scrollTop(): void {
    document.documentElement.scrollTop = 0;
  }

  public updateImageOnError(index: number): void {
    this.arrayDataToShow[index].photo = this.ERROR_IMAGE_URL;
  }

}