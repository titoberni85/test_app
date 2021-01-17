import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageListService } from '../service/image-list.service';

export interface Item {
  id: number,
  photo: string,
  text: string
}

export interface ItemToShow {
  id: number,
  photo: any,
  text: string
}

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})

export class ImageListComponent implements OnInit {

  private randomWords = require('random-words');
  private ITEMS_PER_PAGE: number = 20;
  public arrayDataOriginal: Item[] = [];
  public arrayData: Item[] = [];
  public arrayDataToShow: ItemToShow[] = [];
  public showedItemsIndex: number = 0;
  private showGoUpButton: boolean;
  public searchForm: FormGroup;
  
  showScrollHeight = 400;
  hideScrollHeight = 200;

  constructor(
    private service: ImageListService,
    private cd: ChangeDetectorRef
  ) { 
    this.searchForm = new FormGroup({
      searchType: new FormControl('id'),
      id: new FormControl(''), // [Validators.pattern('^[A-Za-z0-9]{0,2}$')]
      text: new FormControl('') // , Validators.required
    });
    this.showGoUpButton = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (( window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if ( this.showGoUpButton &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop)
      < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

  get f() {return this.searchForm.controls}

  ngOnInit(): void {
    this.generateArrayData();
    this.getNextItems();
    this.initSearchForm();
  }

  private initSearchForm() {
    this.f.searchType.valueChanges.subscribe(searchType => {
      this.f.id.reset();
      this.f.text.reset();
      // this.f.id.clearValidators();
      // this.f.text.clearValidators();
      // if (searchType == 'id') { 
      //   this.f.id.setValidators([Validators.required]);
      //   this.f.id.updateValueAndValidity();
      // }
      // else {
      //   this.f.text.setValidators([Validators.required]);
      //   this.f.text.updateValueAndValidity();
      // }
      this.arrayData = JSON.parse(JSON.stringify(this.arrayDataOriginal));
      this.getNextItems();
    });
  }

  private generateArrayData() {
    for (let index = 0; index < 4000; index++) {
      let item: Item = {
        id: index+1,
        photo: `https://picsum.photos/id/${index+1}/150/150`,
        text: this.randomWords({ exactly: 10, join: ' ' })
      }
      this.arrayDataOriginal.push(item);
      this.arrayData = JSON.parse(JSON.stringify(this.arrayDataOriginal));
    }
  }

  changeForm() {
    if (!this.f.id.value && !this.f.text.value) {
      this.arrayDataToShow = [];
      this.arrayData = JSON.parse(JSON.stringify(this.arrayDataOriginal));
      this.getNextItems();
    }
  }

  getNextItems() {
    let nextItems = this.arrayData.slice(this.arrayDataToShow.length, this.arrayDataToShow.length + this.ITEMS_PER_PAGE);
    nextItems.forEach((item) => {
      this.getImage(item);
    })
    this.arrayDataToShow = this.arrayDataToShow.concat(nextItems);
    this.cd.detectChanges();
  }

  getImage(item: Item) {
    this.service.getImage(item.photo).subscribe(data => {
      this.createImageFromBlob(data, item.id-1);
    }, error => {
      console.log(error);
    });
  }

  createImageFromBlob(image: Blob, itemIndex: number) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.arrayDataToShow[itemIndex].photo = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
 }

  onScroll() {
    console.log('scrolled!!');
    this.getNextItems();
  }

  scrollTop() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Other
  }

  searchItems() {
    this.arrayDataToShow = [];
    if (this.f.searchType.value === 'id') {
      this.searchById();
    } else {
      this.searchByText();
    }
    this.getNextItems();
  }

  searchById() {
    this.arrayData = this.arrayDataOriginal.filter((item) => {
      return item.id === parseInt(this.f.id.value);
    });
  }

  searchByText() {
    this.arrayData = this.arrayDataOriginal.filter((item) => {
      return item.text.indexOf(this.f.text.value) !== -1;
    });
  }
}
